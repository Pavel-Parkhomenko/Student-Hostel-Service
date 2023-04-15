export const MENU_STUDENT = [
  {
    id: 0,
    name: 'Кабинет',
    to: "/student",
    icon: "bi bi-house-fill",
    dropdown: [
      {
        name: 'Личные данные',
        to: "",
        icon: "bi bi-newspaper",
      },
      {
      name: 'Техника',
      to: "tech",
      icon: "bi bi-newspaper",
    }, {
      name: 'Замечания',
      to: "claim",
      icon: "bi bi-newspaper",
    }]
  },
  {
    id: 1,
    name: 'Новости',
    to: "news",
    icon: "bi bi-newspaper",
  },
  {
    id: 2,
    name: 'Мероприятия',
    to: "events",
    icon: "bi bi-calendar-event"
  },
  {
    id: 3,
    name: 'Чат',
    to: "chat",
    icon: "bi bi-chat-left-dots"
  }
]

export const MENU_MENTOR = [
  {
    id: '0',
    name: 'Кабинет',
    to: "/mentor",
    icon: "bi bi-house-fill"
  },
  {
    id: '1',
    name: 'Новости',
    to: "news",
    icon: "bi bi-newspaper",
    dropdown: [{
      name: 'Создать',
      to: "news/create",
      icon: "bi bi-newspaper",
    }, {
      name: 'Просмотреть',
      to: "news",
      icon: "bi bi-newspaper",
    }]
  },
  {
    id: '2',
    name: 'Мероприятия',
    to: "events",
    icon: "bi bi-calendar-event",
    dropdown: [{
      name: 'Создать event',
      to: "events/create",
      icon: "bi bi-newspaper",
    }, {
      name: 'Просмотреть event',
      to: "events",
      icon: "bi bi-newspaper",
    }]
  },
  {
    id: '3',
    name: 'Чат',
    to: "chat",
    icon: "bi bi-chat-left-dots"
  }
]