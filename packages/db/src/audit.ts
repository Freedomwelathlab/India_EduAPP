/**
 * Tamper-evident audit log (master prompt §18 security).
 * Each event stores the hash of the previous event, so an edited or deleted
 * row breaks the chain. In Postgres the same hash is computed in a trigger
 * (migrations/0001_init.sql); this module is the app-side verifier.
 */
import { createHash } from 'node:crypto';

export interface AuditEvent {
  seq: number;
  at: string;
  tenantId: string | null;
  actorId: string;
  action: string;
  target: string;
  detail: Record<string, unknown>;
  prevHash: string;
  hash: string;
}

const GENESIS = '0'.repeat(64);

function digest(e: Omit<AuditEvent, 'hash'>): string {
  return createHash('sha256').update(JSON.stringify([e.seq, e.at, e.tenantId, e.actorId, e.action, e.target, e.detail, e.prevHash])).digest('hex');
}

export function appendAudit(log: AuditEvent[], e: Omit<AuditEvent, 'seq' | 'prevHash' | 'hash'>): AuditEvent {
  const prev = log.at(-1);
  const partial = { ...e, seq: (prev?.seq ?? 0) + 1, prevHash: prev?.hash ?? GENESIS };
  const event = { ...partial, hash: digest(partial) };
  log.push(event);
  return event;
}

/** Returns the seq of the first broken link, or null if the chain is intact. */
export function verifyAudit(log: AuditEvent[]): number | null {
  let prevHash = GENESIS;
  for (const e of log) {
    const { hash, ...rest } = e;
    if (e.prevHash !== prevHash || digest(rest) !== hash) return e.seq;
    prevHash = hash;
  }
  return null;
}
