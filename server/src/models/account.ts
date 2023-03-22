import { Schema, model, Types } from 'mongoose'
import { IAccount } from '../interfaces'

const schema = new Schema<IAccount>({
    _id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { versionKey: false })

module.exports = model<IAccount>('accounts', schema);