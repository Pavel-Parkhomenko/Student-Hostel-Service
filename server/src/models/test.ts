import { Schema, model, Types } from 'mongoose'
const schema = new Schema({
  name: String,
  email: String,
  file: String,
});

module.exports = model('test', schema);