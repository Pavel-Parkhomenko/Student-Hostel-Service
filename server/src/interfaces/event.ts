import { Types } from 'mongoose'
export interface IEvents {
  _id: Types.ObjectId,
  body: {
    header: string,
    description: string,
    img?: string,
    guests?: [
      {
        firstName: string,
        secondName: string,
        middleName: string,
        description: string,
      }
    ],
    party: [
      {
        firstName: string,
        secondName: string,
        description: string,
      }
    ]
  },
  mentor?: {
    firstName: string,
    secondName: string,
    middleName: string,
  },
  dateEvent: string,
  placeEvent: string
}
