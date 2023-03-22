import { Types } from 'mongoose'
export interface News {
    _id: Types.ObjectId,
    header: string,
    description: string,
    mentor: {
        firstName: string,
        secondName: string,
        middleName: string,
    },
    "dateCreate": string,
}
// "10.10.2023 18:50"
