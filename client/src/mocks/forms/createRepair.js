export const CREATE_REPAIR_FORM = [
  {
    nameField: 'Заголовок',
    placeholder: 'починить стул',
    icon: 'bi bi-lock-fill',
    name: 'header',
    id: 'headerRepairId',
    type: "text",
    hr: false,
    required: true,
    pattern: "[A-Za-zА-Яа-яЁё0-9]{5,20}",
    title: "Минимум 5 и максимум 20 символов",
  },
  {
    nameField: 'Описание',
    placeholder: 'сломана ножка',
    icon: 'bi bi-lock-fill',
    name: 'description',
    id: 'descriptionRepairId',
    type: "text",
    hr: true,
    required: true,
  },
]