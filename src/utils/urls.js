export const domain = import.meta.env.VITE_API_KEY


// Groups


export const groupsListUrl = '/groups'

export const groupAddUrl = '/groups'

export const groupDeleteUrl = (id) =>  `/category/${id}/`


// Students


export const studentsListUrl = '/students'

export const studentAddUrl = '/students'

export const studentEditUrl = (id) => `/students/${id}/`

export const studentDeleteUrl = (id) => `/students/${id}/`