import { validationResult } from "express-validator"

export function validateRouter(req) {
    let errors = validationResult(req)
    return errors.isEmpty();
}

export function getDateAndTime() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().padStart(4, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

export function getMonthsUntilSeptember() {
    const today = new Date();
    let year = today.getFullYear()
    if(today.getMonth() < 11) {
        year = year - 1
    }
    const september = new Date(year, 8, 1);

    const diffInMonths = (september.getFullYear() - today.getFullYear()) * 12 +
      (september.getMonth() - today.getMonth());

    return Math.abs(diffInMonths);
}