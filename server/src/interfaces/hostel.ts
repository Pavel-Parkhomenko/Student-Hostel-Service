import { Types } from "mongoose"

export interface IHostel {
  _id?: Types.ObjectId,
  costHostel?: number,
  costsHostel?: Array<number>,
  places?: Array<string>,
}
// масив этажов - массив блоков - массив комнат (0, 1)