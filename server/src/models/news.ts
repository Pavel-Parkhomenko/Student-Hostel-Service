import { Schema, model } from 'mongoose'
import { INews } from '../interfaces'

const schema = new Schema<INews>({
  body: {
    type: [{
      header: { type: String, required: true },
      description: { type: String, required: false },
      img: { type: String, required: false },
    }],
    required: false,
    _id : false,
  },
  mentor: {
    type: {
      firstName: { type: String, required: true },
      secondName: { type: String, required: true },
      middleName: { type: String, required: true },
    },
    required: false,
    _id : false,
  },
  dateCreate: { type: String, required: true },
}, { versionKey: false })

export const News = model<INews>('news', schema);