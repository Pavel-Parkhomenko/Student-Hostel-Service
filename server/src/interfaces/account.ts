import { Types } from "mongoose"

export interface IAccount {
    _id: Types.ObjectId,
    login: string,
    password: string
}