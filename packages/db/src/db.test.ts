import { describe, expect, it } from 'vitest';
import { appendAudit, can, verifyAudit, type Actor, type AuditEvent } from './index';

const school = { organisationId: 'org-1', schoolId: 'sch-1' };
const otherSchool = { organisationId: 'org-1', schoolId: 'sch-2' };
const otherOrg = { organisationId: 'org-2', schoolId: 'sch-9' };

const teacher: Actor = { userId: 'u-t', role: 'teacher', ...school, sectionIds: ['9A'], studentIds: [] };
const student: Actor = { userId: 'u-s', role: 'student', ...school, sectionIds: ['9A'], studentIds: ['stu-1'] };
const parent: Actor = { userId: 'u-p', role: 'guardian', ...school, sectionIds: [], studentIds: ['stu-1'] };
const principal: Actor = { userId: 'u-pr', role: 'principal', ...school, sectionIds: [], studentIds: [] };
const superAdmin: Actor = { userId: 'u-sa', role: 'super_admin', organisationId: null, schoolId: null, sectionIds: [], studentIds: [] };

describe('tenant isolation', () => {
  it('no school role can read another school or organisation', () => {
    for (const a of [teacher, student, parent, principal]) {
      expect(can(a, 'result:view', { ...otherSchool, studentId: 'stu-1', sectionId: '9A' })).toBe(false);
      expect(can(a, 'result:view', { ...otherOrg, studentId: 'stu-1', sectionId: '9A' })).toBe(false);
    }
  });

  it('platform super admin cannot read student records', () => {
    expect(can(superAdmin, 'result:view', { ...school, studentId: 'stu-1' })).toBe(false);
    expect(can(superAdmin, 'curriculum:manage', { organisationId: null, schoolId: null })).toBe(true);
  });
});

describe('role scopes', () => {
  it('teachers see only their own sections', () => {
    expect(can(teacher, 'result:view', { ...school, sectionId: '9A', studentId: 'stu-1' })).toBe(true);
    expect(can(teacher, 'result:view', { ...school, sectionId: '10B', studentId: 'stu-7' })).toBe(false);
  });

  it('students see only themselves; guardians only their own child', () => {
    expect(can(student, 'result:view', { ...school, studentId: 'stu-1' })).toBe(true);
    expect(can(student, 'result:view', { ...school, studentId: 'stu-2' })).toBe(false);
    expect(can(parent, 'result:view', { ...school, studentId: 'stu-1' })).toBe(true);
    expect(can(parent, 'result:view', { ...school, studentId: 'stu-2' })).toBe(false);
  });

  it('students can never see answer keys or release tests', () => {
    expect(can(student, 'question:view_key', school)).toBe(false);
    expect(can(student, 'assessment:release', school)).toBe(false);
    expect(can(parent, 'doubt:answer', school)).toBe(false);
  });
});

describe('audit chain', () => {
  it('detects tampering', () => {
    const log: AuditEvent[] = [];
    appendAudit(log, { at: '2026-10-08T10:00:00Z', tenantId: 'sch-1', actorId: 'u-t', action: 'assessment.release', target: 'pt1', detail: {} });
    appendAudit(log, { at: '2026-10-08T10:05:00Z', tenantId: 'sch-1', actorId: 'u-t', action: 'ia.edit', target: 'stu-1', detail: { from: 4, to: 5 } });
    appendAudit(log, { at: '2026-10-08T10:06:00Z', tenantId: 'sch-1', actorId: 'u-pr', action: 'result.view', target: '9A', detail: {} });
    expect(verifyAudit(log)).toBeNull();
    log[1]!.detail = { from: 4, to: 20 };
    expect(verifyAudit(log)).toBe(2);
  });
});
