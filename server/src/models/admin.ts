import { Schema, model } from 'mongoose'
import { IAdmin } from '../interfaces'

const schema = new Schema<IAdmin>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  secondName: { type: String, required: true },
  role: { type: String, required: false },
  img: { type: String, required: false },
  account: {
    type: {
      login: { type: String, required: true },
    },
    required: true
  },

}, { versionKey: false })

export const Admin = model<IAdmin>('admin', schema);