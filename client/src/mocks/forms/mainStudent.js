export const CHANGE_INFO_STUDENT = [
  {
    nameField: 'Email',
    placeholder: '',
    icon: 'bi bi-book',
    name: 'email',
    id: 'emailId',
    type: "email",
    required: false,
    summaryBefore: 'Данная форма позволяет изменить одно или несколько полей'
  },
  {
    nameField: 'Логин',
    placeholder: '',
    icon: 'bi bi-lock-fill',
    name: 'login',
    id: 'loginId',
    type: "text",
    required: false,
    hr: true,
  },
  {
    nameField: 'Введите старый пароль',
    placeholder: '',
    icon: 'bi bi-lock-fill',
    name: 'oldPassword',
    id: 'oldPasswordId',
    type: "password",
    required: false,
  },
  {
    nameField: 'Введите новый пароль',
    placeholder: '',
    icon: 'bi bi-lock-fill',
    name: 'newPassword',
    id: 'newPasswordId',
    type: "password",
    required: false,
  },
  {
    nameField: 'Повторите пароль',
    placeholder: '',
    icon: 'bi bi-lock-fill',
    name: 'repeatPassword',
    id: 'repeatPasswordId',
    type: "password",
    required: false,
    hr: true,
  },
]