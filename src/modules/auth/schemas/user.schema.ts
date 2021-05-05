import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: Map,
    of: String,
    required: true,
  },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  verified: { type: Boolean, required: false }
});
