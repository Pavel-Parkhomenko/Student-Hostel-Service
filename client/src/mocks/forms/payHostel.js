export const PAY_HOSTEL_FORM = [
  {
    nameField: 'Номер квитанции',
    placeholder: 'RT87TR1386UG',
    icon: 'bi bi-person',
    name: 'receipt',
    id: 'receiptPayId',
    type: "string",
    required: true,
    pattern: "[A-Z0-9]{8,10}",
    title: "Введите номер квитанции",
    summaryAfter: 'Номер квитанции находится сразу же после имени плательщика'
  },
]