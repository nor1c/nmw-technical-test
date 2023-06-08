import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string,
  name: string,
  age?: number,
  dob: string
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minLength: 5,
  },
  name: {
    type: String,
    required: [true, 'Name required!'],
    minLength: 3
  },
  age: {
    type: Number,
    required: false
  },
  dob: Date,
}, {
  timestamps: true
})

export const User = mongoose.model<IUser>('users', userSchema)