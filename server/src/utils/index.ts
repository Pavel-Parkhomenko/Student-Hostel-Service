import { validationResult } from "express-validator"

export function validateRouter(req) {
    let errors = validationResult(req)
    return errors.isEmpty();
}