import UserService from "./user.service"
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

export default class UserController {
  private service: UserService

  constructor() {
    this.service = new UserService()
  }

  getUsers() {
    return async (req: Request, res: Response) => {
      const users = await this.service.find()

      res.send(users)
    }
  }

  findUser() {
    return async (req: Request, res: Response) => {
      const { id } = req.params

      const userId = new ObjectId(id)

      const user = await this.service.find(userId)

      res.status(200).json({
        success: true,
        user
      })
    }
  }

  createUser() {
    return async (req: Request, res: Response) => {
      try {
        const data = req.body

        const createdUser = await this.service.create(data)

        res.status(201).json({
          success: true,
          user: createdUser
        })
      } catch (error: any) {
        res.json({
          success: false,
          error
        })
      }
    }
  }

  updateUser() {
    return async (req: Request, res: Response) => {
      const { id } = req.params
      const userId = new ObjectId(id)

      const data = req.body

      const user = await this.service.update(userId, data)

      res.status(200).json({
        success: true,
        message: 'User updated!',
        user
      })
    }
  }

  deleteUser() {
    return async (req: Request, res: Response) => {
      const { id } = req.params

      await this.service.delete(new ObjectId(id))

      res.status(200).json({
        success: true,
        message: 'User deleleted!'
      })
    }
  }
}