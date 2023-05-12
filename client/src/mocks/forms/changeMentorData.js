export const CHANGE_MENTOR_DATA_FORM = [
  {
    nameField: 'Логин',
    placeholder: '',
    icon: 'bi bi-person',
    name: 'login',
    id: 'loginMentorId',
    type: "text",
    required: false,
    pattern: "[A-Za-zА-Я0-9]{3,15}",
    title: "Минимум 3 и максимум 15 символов",
    summaryBefore: 'Здесь вы можете изменить данные учетной записи'
  },
  {
    nameField: 'Введите старый пароль',
    placeholder: '',
    icon: 'bi bi-lock-fill',
    name: 'oldPassword',
    id: 'oldPasswordMentorId',
    type: "password",
    required: false,
    pattern: "[A-Za-zА-Я0-9]{5,15}",
    title: "Минимум 5 и максимум 15 символов"
  },
  {
    nameField: 'Введите новый пароль',
    placeholder: '',
    icon: 'bi bi-lock-fill',
    name: 'newPassword',
    id: 'newPasswordMentorId',
    type: "password",
    required: false,
    pattern: "[A-Za-zА-Я0-9]{5,15}",
    title: "Минимум 5 и максимум 15 символов"
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
    pattern: "[A-Za-zА-Я0-9]{5,15}",
    title: "Минимум 5 и максимум 15 символов"
  },
  {
    nameField: 'Введите свой номер телефона',
    placeholder: '+375-29-1234567',
    icon: 'bi bi-phone',
    name: 'phone',
    id: 'phoneMentorId',
    type: "tel",
    required: false,
    hr: false,
    pattern: "[+][0-9]{3}-[0-9]{2}-[0-9]{7}",
    title: "Например +375-29-1234567"
  },
  {
    nameField: 'Введите email',
    placeholder: 'example@gmail.com',
    icon: 'bi bi-files',
    name: 'email',
    id: 'emailMentorId',
    type: "email",
    required: false,
    hr: true,
  },
]