import {Schema, model, Types} from 'mongoose'
import { IEvent } from '../interfaces'

const schema = new Schema<IEvent>({
  header: { type: String, required: true },
  description: { type: String, required: false },
  img: { type: String, required: false },
  party: {
    type: [{
      firstName: { type: String, required: true },
      secondName: { type: String, required: true },
      description: { type: String, required: false },
    }],
    required: false,
    _id : false,
  },
  dateEvent: { type: String, required: true },
  placeEvent: { type: String, required: true },
}, { versionKey: false })

module.exports = model<IEvent>('events', schema);