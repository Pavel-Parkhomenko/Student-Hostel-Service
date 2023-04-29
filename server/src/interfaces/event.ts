import { Types } from 'mongoose'
export interface IEvent {
  _id: Types.ObjectId,
  header: string,
  description: string,
  img?: string,
  party: [
    {
      firstName: string,
      secondName: string,
      description: string,
    }
  ],
  dateEvent: string,
  placeEvent: string
}
