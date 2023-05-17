import { Types } from "mongoose"

export interface IHostel {
  _id?: Types.ObjectId,
  costHostel?: number,
  costsHostel?: Array<number>
}