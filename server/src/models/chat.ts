import { Schema, model } from 'mongoose'

import { IChat } from '../interfaces'

const chatSchema = new Schema<IChat>({
  name: { type: String, required: false },
  messages: {
    type: [{
      text: { type: String, required: false },
      user: { type: String, required: false },
      createdAt: { type: String, required: false },
    }]
  },
});

export const Chat = model<IChat>('chats', chatSchema);