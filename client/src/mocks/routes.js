export const ROUTES_MENTOR = [
  {path: "/", breadcrumb: "Домашняя"},
  {path: "/mentor", breadcrumb: "Кабинет"},
  {path: "/mentor/students", breadcrumb: "Студенты"},
  {path: "/mentor/students/:id", breadcrumb: "Студент"},
  {path: "/mentor/students/:id/create", breadcrumb: "Создать замечание"},
  {path: "/mentor/students/:id/add-tech", breadcrumb: "Добавить технику"},
  {path: "/mentor/news", breadcrumb: "Новости"},
  {path: "/mentor/news/:id", breadcrumb: "Просмотр"},
  {path: "/mentor/news/create", breadcrumb: "Новая новость"},
  {path: "/mentor/events", breadcrumb: "Мероприятия"},
  {path: "/mentor/events/create", breadcrumb: "Создать"},
]

export const ROUTES_STUDENT = [
  {path: "/", breadcrumb: "Домашняя"},
  {path: "/student", breadcrumb: "Кабинет"},
  {path: "/student/news", breadcrumb: "Новости"},
  {path: "/student/news/:id", breadcrumb: "Просмотр"},
  {path: "/student/events", breadcrumb: "События"},
  {path: "/student/chat", breadcrumb: "Чат"},
  {path: "/student/employee-info", breadcrumb: "Воспитатели"},
  {path: "/student/employee-info/:id", breadcrumb: "Воспитатель"},
  {path: "/student/tech", breadcrumb: "Техника"},
  {path: "/student/claim", breadcrumb: "Замечания"},
  {path: "/student/create-repair", breadcrumb: "Починка оборудования"},
]

export const ROUTES_ADMIN = [
  {path: "/", breadcrumb: "Домашняя"},
  {path: "/admin", breadcrumb: "Кабинет"},
  {path: "/admin/students", breadcrumb: "Студенты"},
  {path: "/admin/employee", breadcrumb: "Сотрудники"},
  {path: "/admin/employee/:id", breadcrumb: "Сотрудник"},
  {path: "/admin/students/import", breadcrumb: "Импорт"},
  {path: "/admin/students/:id", breadcrumb: "Студент"},
  {path: "/admin/students/:id/add-tech", breadcrumb: "Добавить технику"},
]
