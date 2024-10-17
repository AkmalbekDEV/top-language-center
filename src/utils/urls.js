export const domain = import.meta.env.VITE_API_KEY;

// Groups

export const groupsListUrl = "/groups";

export const groupAddUrl = "/groups";

export const groupDeleteUrl = (id) => `/groups/${id}/`;

export const groupEditUrl = (id) => `/groups/${id}/`;

// Students

export const studentsListUrl = "/students";

export const studentsListRelationUrl = (groupId) =>
  `/students?_relations=groups&group_id=${groupId}`;

export const studentAddUrl = "/students";

export const studentEditUrl = (id) => `/students/${id}/`;

export const studentDeleteUrl = (id) => `/students/${id}/`;

// Journals

export const journalsListUrl = [
  "/standard_journals",
  "/advanced_journals",
  "/top_journals",
];

export const journalRelationUrl = (course_type, groupId) =>
  `${journalsListUrl[course_type]}?_relations=groups&group_id=${groupId}`;

// Weeks

export const weeksListUrl = [
  "/standard_weeks",
  "/advanced_weeks",
  "/top_weeks",
];
