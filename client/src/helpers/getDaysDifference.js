export function getDaysDifference(date1, date2) { //old, new
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Округляем даты до начала дня
  const roundedDate1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const roundedDate2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  // Вычисляем разницу в днях и округляем до целого числа
  const diffInMs = Math.abs(roundedDate2 - roundedDate1);
  const diffInDays = Math.round(diffInMs / oneDayMs);

  return diffInDays;
}