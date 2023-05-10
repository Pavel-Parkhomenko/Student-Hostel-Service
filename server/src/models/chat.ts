import { Schema, model, Types } from 'mongoose'

import { IChat } from '../interfaces'

const chatSchema = new Schema<IChat>({
  name: { type: String, required: false },
  messages: {
    type: [{
      text: { type: String, required: false },
      user: { type: String, required: false },
      createdAt: { type: String, default: Date.now, required: false },
    }]
  },
});

export const Chat = model<IChat>('chats', chatSchema);