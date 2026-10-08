import { appendAudit, verifyAudit, permissionsOf, type AuditEvent, type Role } from '@ieos/db';
import { PageHead } from '@/components/ui';

export const metadata = { title: 'Trust & audit' };

const GATES = [
  ['Academic', 'Curriculum v2026-27 marks reconcile; prerequisite graph valid', 'pass'],
  ['Content', '10 seed questions still in draft; no named expert reviewer yet', 'blocked'],
  ['Safety', 'Doubts private; no student-to-student messaging; staff-only sessions', 'pass'],
  ['Privacy', 'Consent model built; notice text pending lawyer review (DPDP, 13 May 2027)', 'blocked'],
  ['Security', 'RLS migration written; pen-test not yet run', 'pending'],
  ['Accessibility', 'Keyboard + ARIA on question cards; axe audit not yet run', 'pending'],
  ['AI', 'All AI features off; eval set not built', 'n/a'],
  ['Reliability', 'No production deploy yet', 'pending'],
] as const;

export default function Trust() {
  const log: AuditEvent[] = [];
  appendAudit(log, { at: '2026-10-08T09:10:00+05:30', tenantId: 'sch-demo', actorId: 'tch-rao', action: 'assessment.release', target: 'PT-1 9A Maths', detail: {} });
  appendAudit(log, { at: '2026-10-08T09:42:00+05:30', tenantId: 'sch-demo', actorId: 'tch-rao', action: 'ia.edit', target: 's4 portfolio', detail: { from: 0.4, to: 0.6 } });
  appendAudit(log, { at: '2026-10-08T10:05:00+05:30', tenantId: null, actorId: 'admin', action: 'curriculum.publish', target: 'CBSE:2026-27', detail: {} });
  const intact = verifyAudit(log) === null;
  const roles: Role[] = ['student', 'guardian', 'teacher', 'principal', 'super_admin'];

  return (
    <>
      <PageHead title="Trust & audit" sub="Release gates (master prompt §37), the role matrix and the tamper-evident audit log" />
      <div className="card">
        <h2>Release gates</h2>
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Gate</th><th>Evidence</th><th>Status</th></tr></thead>
          <tbody>{GATES.map(([g, e, s]) => (
            <tr key={g}><td><b>{g}</b></td><td className="small">{e}</td><td><span className={`chip ${s === 'pass' ? 'ok' : s === 'blocked' ? 'bad' : s === 'pending' ? 'warn' : ''}`}>{s}</span></td></tr>
          ))}</tbody>
        </table></div>
      </div>
      <div className="grid g2 section" style={{ alignItems: 'start' }}>
        <div className="card">
          <h2>Role permissions</h2>
          <div className="table-wrap"><table className="t">
            <tbody>{roles.map((r) => <tr key={r}><td><b>{r}</b></td><td className="small">{permissionsOf(r).join(', ')}</td></tr>)}</tbody>
          </table></div>
          <p className="small muted" style={{ marginTop: 8 }}>The platform super admin cannot read any student record. Tenant isolation is enforced in the app (rbac.ts) and in the database (RLS).</p>
        </div>
        <div className="card">
          <div className="row between"><h2>Audit log</h2><span className={`chip ${intact ? 'ok' : 'bad'}`}>{intact ? 'Hash chain intact' : 'TAMPERED'}</span></div>
          <div className="table-wrap"><table className="t">
            <thead><tr><th>#</th><th>Action</th><th>Target</th><th>Hash</th></tr></thead>
            <tbody>{log.map((e) => <tr key={e.seq}><td>{e.seq}</td><td><code>{e.action}</code><br /><span className="small muted">{e.actorId}</span></td><td className="small">{e.target}</td><td><code className="small">{e.hash.slice(0, 10)}…</code></td></tr>)}</tbody>
          </table></div>
        </div>
      </div>
    </>
  );
}
