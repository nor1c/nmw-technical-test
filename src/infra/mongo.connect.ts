import mongoose, { } from 'mongoose'

export default class MongoClient {
  private mongoUrl: string

  constructor() {
    this.mongoUrl = "mongodb://localhost:27017/nmw"
  }

  async connect() {
    try {
      await mongoose.connect(this.mongoUrl)

      console.log('Connection established!')
    } catch (error) {
      throw new Error('Mongo connection failed!')
    }
  }
}