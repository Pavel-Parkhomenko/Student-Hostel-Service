import {Schema, model, Types} from 'mongoose'
import { IEvent } from '../interfaces'

const schema = new Schema<IEvent>({
  header: { type: String, required: true },
  description: { type: String, required: false },
  img: { type: String, required: false },
  dateEvent: { type: String, required: true },
  placeEvent: { type: String, required: true },
}, { versionKey: false })

export const Event = model<IEvent>('events', schema);

//party: {
//     type: [{
//       firstName: { type: String, required: true },
//       secondName: { type: String, required: true },
//       description: { type: String, required: false },
//     }],
//     required: false,
//     _id : false,
//   },