import { Types } from 'mongoose'

export interface IRepair {
  _id: Types.ObjectId,
  room: IRoom,
  header: string,
  description: string,
  student: {
    firstName: string,
    secondName: string,
    middleName: string,
    numberTest: number
  },
  dateCreate: string,
  status: number,
  run?: {
    date: string,
    master: string,
  }
}

interface IRoom {
  floor: number,
  block: number,
  apartament: number
}
// "10.10.2023 18:50"
