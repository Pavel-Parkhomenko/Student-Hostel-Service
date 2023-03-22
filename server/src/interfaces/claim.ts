import {Types} from "mongoose";

export interface IClaim {
    _id: Types.ObjectId,
    header: string,
    description: string,
    student: IStudent,
    dateAndTime: string
}

interface IStudent {
    firstName: string,
    secondName: string,
    room: IRoom,
}

interface IRoom {
    floor: number,
    block: number,
    room: number
}