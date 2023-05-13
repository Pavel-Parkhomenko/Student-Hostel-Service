export const ADD_STUDENT_FORM = [
  {
    nameField: 'Имя',
    placeholder: 'Иван',
    icon: 'bi bi-person',
    name: 'firstName',
    id: 'firstNameStudentId',
    type: "text",
    required: true,
    pattern: "[A-Za-zА-Яа-я]{3,15}",
    title: "Минимум 3 и максимум 15 символов",
  },
  {
    nameField: 'Фамилия',
    placeholder: 'Иванов',
    icon: 'bi bi-person',
    name: 'secondName',
    id: 'secondNameStudentId',
    type: "text",
    required: true,
    pattern: "[A-Za-zА-Яа-я]{3,15}",
    title: "Минимум 3 и максимум 15 символов",
  },
  {
    nameField: 'Отчество',
    placeholder: 'Иванович',
    icon: 'bi bi-person',
    name: 'middleName',
    id: 'middleNameStudentId',
    type: "text",
    required: true,
    hr: true,
    pattern: "[A-Za-zА-Яа-я]{3,15}",
    title: "Минимум 3 и максимум 15 символов",
  },
  {
    nameField: 'Форма образования',
    placeholder: 'бесплатное или платное',
    icon: 'bi bi-person',
    name: 'formEducation',
    id: 'formEducationStudentId',
    type: "text",
    required: true,
    pattern: "[A-Za-zА-Яа-я]{6,15}",
    title: "бесплатное или платное",
  },
  {
    nameField: 'Номер зачетки',
    placeholder: '1234567',
    icon: 'bi bi-person',
    name: 'numberTest',
    id: 'numberTestStudentId',
    type: "number",
    required: true,
    hr: true,
    pattern: "[0-9]{6,10}",
    title: "Введите номер зачетной книжки",
  },
  {
    nameField: 'Номер этажа',
    placeholder: '12',
    icon: 'bi bi-person',
    name: 'floor',
    id: 'floorStudentId',
    type: "number",
    required: true,
    pattern: "[0-9]{1,3}",
    title: "Введите номер этажа",
  },
  {
    nameField: 'Блок',
    placeholder: '1',
    icon: 'bi bi-person',
    name: 'block',
    id: 'blockStudentId',
    type: "number",
    required: true,
    pattern: "[0-9]{1-3}",
    title: "Введите номер этажа",
  },
  {
    nameField: 'Комната',
    placeholder: '1',
    icon: 'bi bi-person',
    name: 'apartament',
    id: 'apartamentStudentId',
    type: "number",
    required: true,
    hr: true,
    pattern: "[0-9]{1,3}",
    title: "Введите номер комнаты",
  },
]