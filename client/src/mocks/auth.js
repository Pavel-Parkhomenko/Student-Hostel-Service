export const fieldsRegistration = [
  {
    nameField: 'Логин',
    placeholder: 'Введите логин',
    icon: 'bi bi-person',
    name: 'login',
    id: 'loginField',
    type: "text"
  },
  {
    nameField: 'Пароль',
    placeholder: '',
    icon: 'bi bi-lock-fill',
    name: 'password',
    id: 'passwordField',
    type: "password"
  },
]
export const fieldsLogin = [
  ...fieldsRegistration,
  {
    nameField: 'Номер зачетки',
    placeholder: '12345678',
    icon: 'bi bi-book',
    name: 'numberTest',
    id: 'numberTestField',
    type: "number"
  },
]
// nameField, placeholder, icon, name, id