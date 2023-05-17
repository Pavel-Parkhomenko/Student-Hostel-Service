import { Schema, model } from 'mongoose'
import { IHostel } from '../interfaces'

const schema = new Schema<IHostel>({
  costHostel: { type: Number, required: false, default: 0 },
  costsHostel: { type: [Number], required: false },

}, { versionKey: false })

export const Hostel = model<IHostel>('hostels', schema);