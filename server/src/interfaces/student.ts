import { Types } from "mongoose"
export interface IStudent {
    _id?: Types.ObjectId,
    firstName: string,
    secondName: string,
    middleName: string,
    numberTest: number,
    email?: string,
    formEducation: "платное" | "бесплатное",
    dateEntry?: string,
    balls?: number,
    privateTechs?: Array<IPrivateTech>,
    room: IRoom,
    remarks?: Array<IRemark>,
    account?: IAccount
}

interface IAccount {
    _id: Types.ObjectId,
    login: string,
}

interface IRemark {
    dateAndTime: string,
    header: string,
    status: number,
    text: string,
    mentor: IMentor
}

interface IMentor {
    firstName: string,
    secondName: string,
    middleName: string,
}

interface IPrivateTech {
    model: string,
    number: string,
    type: string,
}

interface IRoom {
    floor: number,
    block: number,
    apartament: number
}