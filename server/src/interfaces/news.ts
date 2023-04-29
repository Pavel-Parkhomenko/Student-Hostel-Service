import { Types } from 'mongoose'
export interface INews {
    _id: Types.ObjectId,
    body: [{
        header: string,
        description: string,
        img: string,
    }],
    mentor?: {
        firstName: string,
        secondName: string,
        middleName: string,
    },
    dateCreate: string,
}
// "10.10.2023 18:50"
