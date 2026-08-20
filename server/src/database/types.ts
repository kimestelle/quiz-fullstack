import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  users: UserTable;
  classes: ClassTable;
  teacherGroups: TeacherGroupTable;
  teacherGroupMembers: TeacherGroupMemberTable;
  assignments: AssignmentTable;
  submissions: SubmissionTable;
}

// Users & Roles
export interface UserTable {
  id: Generated<string>;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: Generated<Date>; //tracking creation
  updatedAt: Generated<Date>; //tracking updates
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

// Classes & Groups
export interface ClassTable {
  id: Generated<string>;
  name: string;
  teacherId: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Class = Selectable<ClassTable>;
export type NewClass = Insertable<ClassTable>;
export type ClassUpdate = Updateable<ClassTable>;

export interface TeacherGroupTable {
  id: Generated<string>;
  name: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type TeacherGroup = Selectable<TeacherGroupTable>;
export type NewTeacherGroup = Insertable<TeacherGroupTable>;
export type TeacherGroupUpdate = Updateable<TeacherGroupTable>;

export interface TeacherGroupMemberTable {
  groupId: string;
  teacherId: string;
}

export type TeacherGroupMember = Selectable<TeacherGroupMemberTable>;
export type NewTeacherGroupMember = Insertable<TeacherGroupMemberTable>;

// Assignments & Submissions
export interface AssignmentTable {
  id: Generated<string>;
  title: string;
  description: string;
  classId: string;
  dueDate: Date;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

export type Assignment = Selectable<AssignmentTable>;
export type NewAssignment = Insertable<AssignmentTable>;
export type AssignmentUpdate = Updateable<AssignmentTable>;

export interface SubmissionTable {
  id: Generated<string>;
  assignmentId: string;
  studentId: string;
  content: string;
  submittedAt: Generated<Date>;
  grade: Generated<number | null>; // Optional, as it may not be graded yet
  feedback: Generated<string | null>; // Optional feedback from the teacher
}

export type Submission = Selectable<SubmissionTable>;
export type NewSubmission = Insertable<SubmissionTable>;
export type SubmissionUpdate = Updateable<SubmissionTable>;
