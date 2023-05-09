import { Types } from "mongoose"

export interface IAdmin {
  _id?: Types.ObjectId,
  firstName: string,
  secondName: string,
  middleName: string,
  role: "admin",
  account: {
   login: string,
 },
  img: string,
}