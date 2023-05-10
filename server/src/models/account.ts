import { Schema, model, Types } from 'mongoose'
import { IAccount } from '../interfaces'

const schema = new Schema<IAccount>({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {type: String, required: false}
}, { versionKey: false })

export const Account = model<IAccount>('accounts', schema);