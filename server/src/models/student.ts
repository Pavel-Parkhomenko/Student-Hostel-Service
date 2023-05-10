import { Schema, model } from 'mongoose'
import { IStudent } from '../interfaces'

const schema = new Schema<IStudent>({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    secondName: { type: String, required: true },
    balls: { type: Number, required: false },
    dateEntry: { type: String, required: false },
    formEducation: { type: String, required: true },
    numberTest: { type: Number, required: true, default: 0 },
    account: {
        type: {
            _id: { type: Schema.Types.ObjectId, required: false },
            login: { type: String, required: true },
        },
        required: false,
        _id : false,
    },
    privateTechs: {
        type: [{
            model: { type: String, required: true },
            number: { type: String, required: true },
            type: { type: String, required: true },
        }],
        required: false,
        _id : false,
    },
    remarks: {
        type: [{
            dateAndTime: { type: String, required: true },
            header: { type: String, required: true },
            text: { type: String, required: true },
            status: { type: Number, required: true },
            mentor: {
                type: {
                    firstName: { type: String, required: true },
                    secondName: { type: String, required: true },
                    middleName: { type: String, required: true },
                },
                required: false,
                _id : false,
            }
        }],
        required: false,
        _id : false,
    },
    room: {
        type: {
            floor: { type: Number, required: true },
            block: { type: Number, required: true },
            apartament: { type: Number, required: true },
        },
        required: true,
        _id : false,
    },
    chats: { type: [String], required: false },
    img: { type: String, required: false },

}, { versionKey: false })

export const Student = model<IStudent>('students', schema);