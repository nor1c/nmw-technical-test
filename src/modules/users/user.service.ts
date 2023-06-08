import { ObjectId } from "mongodb";
import { IUser, User } from "../../infra/models/User";

export default class UserService {
  async find(_id?: ObjectId): Promise<IUser[]> {
    let users: IUser | IUser[]

    if (typeof _id !== "undefined") {
      users = await User.find({
        _id
      })
    } else {
      users = await User.find()
    }

    return users
  }

  async create(data: IUser) {
    return await User.create(data)
  }

  async update(
    _id: ObjectId,
    data: IUser
  ) {
    return await User.updateOne({
      _id
    }, data)
  }

  async delete(_id: ObjectId) {
    return await User.deleteOne({
      _id
    })
  }
}