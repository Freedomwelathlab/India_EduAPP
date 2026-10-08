/**
 * Role + scope model (master prompt §12). Mirrors the RLS policies in
 * migrations/0001_init.sql, so the app layer and the database say the same thing.
 *
 * Deny by default. A permission is granted only when the role holds it AND the
 * target sits inside the actor's scope (organisation → school → section → self).
 */

export type Role =
  | 'super_admin' | 'org_admin' | 'school_admin' | 'principal' | 'academic_coordinator'
  | 'teacher' | 'student' | 'guardian' | 'counsellor'
  | 'content_author' | 'content_reviewer' | 'assessment_reviewer' | 'compliance_admin';

export type Permission =
  | 'curriculum:manage' | 'content:author' | 'content:review' | 'content:publish'
  | 'question:view_key'
  | 'assessment:create' | 'assessment:release' | 'assessment:mark'
  | 'result:view' | 'ia:edit'
  | 'student:view_profile'
  | 'doubt:ask' | 'doubt:answer'
  | 'session:create' | 'session:join'
  | 'video:upload' | 'video:watch'
  | 'audit:view' | 'tenant:manage' | 'privacy:handle_request';

const P: Record<Role, Permission[]> = {
  super_admin: ['curriculum:manage', 'content:publish', 'audit:view', 'tenant:manage'],
  org_admin: ['result:view', 'student:view_profile', 'audit:view'],
  school_admin: ['student:view_profile', 'result:view', 'audit:view', 'session:create'],
  principal: ['result:view', 'student:view_profile', 'assessment:release', 'audit:view'],
  academic_coordinator: ['assessment:create', 'assessment:release', 'result:view', 'student:view_profile', 'session:create', 'question:view_key', 'video:upload'],
  teacher: ['assessment:create', 'assessment:mark', 'result:view', 'ia:edit', 'student:view_profile', 'doubt:answer', 'session:create', 'question:view_key', 'video:upload', 'video:watch'],
  student: ['doubt:ask', 'session:join', 'video:watch', 'result:view', 'student:view_profile'],
  guardian: ['result:view', 'student:view_profile'],
  counsellor: ['student:view_profile'],
  content_author: ['content:author', 'question:view_key'],
  content_reviewer: ['content:review', 'question:view_key'],
  assessment_reviewer: ['content:review', 'question:view_key'],
  compliance_admin: ['audit:view', 'privacy:handle_request'],
};

export interface Actor {
  userId: string;
  role: Role;
  organisationId: string | null; // null only for platform roles
  schoolId: string | null;
  /** Sections a teacher is assigned to. */
  sectionIds: string[];
  /** For guardians: the children they are authorised for. For students: themselves. */
  studentIds: string[];
}

export interface Target {
  organisationId: string | null;
  schoolId: string | null;
  sectionId?: string;
  studentId?: string;
}

const PLATFORM_ROLES: Role[] = ['super_admin', 'content_author', 'content_reviewer', 'assessment_reviewer', 'compliance_admin'];

export function can(actor: Actor, perm: Permission, target: Target): boolean {
  if (!P[actor.role].includes(perm)) return false;

  // Platform roles act on platform content, never on a school's student records.
  if (PLATFORM_ROLES.includes(actor.role)) {
    if (target.studentId) return false;
    return perm === 'tenant:manage' || perm === 'audit:view' || target.schoolId === null;
  }

  // Tenant isolation: never cross organisation or school boundaries.
  if (!actor.organisationId || actor.organisationId !== target.organisationId) return false;
  if (actor.role === 'org_admin') return true;
  if (actor.schoolId !== target.schoolId) return false;

  switch (actor.role) {
    case 'school_admin': case 'principal': case 'academic_coordinator': case 'counsellor':
      return true;
    case 'teacher':
      // Only students and sections the teacher actually teaches.
      if (target.sectionId) return actor.sectionIds.includes(target.sectionId);
      return !target.studentId; // student-level access needs the section to be known
    case 'student': case 'guardian':
      return target.studentId !== undefined && actor.studentIds.includes(target.studentId);
    default:
      return false;
  }
}

export const permissionsOf = (role: Role): readonly Permission[] => P[role];
