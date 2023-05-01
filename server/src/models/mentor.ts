import { Schema, model } from 'mongoose'
import { IMentor } from '../interfaces'

const schema = new Schema<IMentor>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  secondName: { type: String, required: true },
  role: { type: String, required: false },
  img: { type: String, required: false },
  account: {
    type: {
      _id: { type: Schema.Types.ObjectId, required: false },
      login: { type: String, required: true },
    },
    required: true
  },
  impact: {
    type: {
      from: { type: Number, required: true },
      to: { type: Number, required: true },
    },
    required: true,
    _id : false,
  },
  chats: { type: [String], required: false }

}, { versionKey: false })

module.exports = model<IMentor>('mentors', schema);