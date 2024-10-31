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

export const journalRelationUrl = (course_type, groupId, week) =>
  `${journalsListUrl[course_type]}?_relations=groups&group_id=${groupId}&journal_week_id=${week}`;

export const journalAddUrl = (course_type) => `${journalsListUrl[course_type]}`

export const journalEditUrl = (course_type, id) => `${journalsListUrl[course_type]}/${id}`

export const journalDeleteUrl = (course_type, id) => `${journalsListUrl[course_type]}/${id}`

// Weeks

export const weeksListUrl = "/journal_weeks";