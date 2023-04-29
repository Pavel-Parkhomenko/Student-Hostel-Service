import { Types } from 'mongoose'
export interface IEvent {
  _id: Types.ObjectId,
  header: string,
  description: string,
  img?: string,
  dateEvent: string,
  placeEvent: string
}
