import { Schema, model } from 'mongoose'
import { IRepair } from '../interfaces'

const schema = new Schema<IRepair>({
  header: { type: String, required: true },
  description: { type: String, required: true },
  room: {
    type: {
      floor: { type: Number, required: true },
      block: { type: Number, required: true },
      apartament: { type: Number, required: true },
    },
    required: true,
    _id : false,
  },
  student: {
    type: {
      firstName: { type: String, required: true },
      secondName: { type: String, required: true },
      middleName: { type: String, required: true },
      numberTest: { type: Number, required: true },
    },
    required: false,
    _id : false,
  },
  dateCreate: { type: String, required: true },
  status: { type: Number, required: true },
}, { versionKey: false })

export const Repair = model<IRepair>('repairs', schema);