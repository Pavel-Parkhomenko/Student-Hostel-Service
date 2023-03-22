import { Schema, model } from 'mongoose'
import { IStudent } from '../interfaces'

const schema = new Schema<IStudent>({
    _id: { type: Schema.Types.ObjectId, required: false },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    secondName: { type: String, required: true },
    balls: { type: Number, required: true },
    dateEntry: { type: String, required: false },
    formEducation: { type: String, required: true },
    numberTest: { type: Number, required: true },
    account: {
        type: {
            _id: { type: Schema.Types.ObjectId, required: false },
            login: { type: String, required: true },
        },
        required: false
    },
    privateTechs: {
        type: [{
            model: { type: String, required: true },
            number: { type: String, required: true },
            type: { type: String, required: true },
        }],
        required: false
    },
    remarks: {
        type: [{
            dateAndTime: { type: String, required: true },
            text: { type: String, required: true },
            mentor: {
                type: {
                    firstName: { type: String, required: true },
                    secondName: { type: String, required: true },
                    middleName: { type: String, required: true },
                },
                required: false
            }
        }],
        required: false
    },
    room: {
        type: {
            floor: { type: Number, required: true },
            block: { type: Number, required: true },
            room: { type: Number, required: true },
        },
        required: true
    }

}, { versionKey: false })

module.exports = model<IStudent>('students', schema);