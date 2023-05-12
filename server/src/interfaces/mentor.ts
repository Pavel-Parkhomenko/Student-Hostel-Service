import { IChat } from "./chat";
import {Types} from "mongoose";
interface IAccount {
  _id?: Types.ObjectId,
  login: string,
}

export interface IMentor {
  _id: string,
  firstName: string,
  secondName: string,
  middleName: string,
  phone?: string,
  email?: string,
  role?: "mentor"
  img?: string,
  chats?: Array<string>,
  account: IAccount,
  impact: {
    from: number,
    to: number
  }
}