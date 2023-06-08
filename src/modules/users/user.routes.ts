import { Router } from 'express'
import UserController from './user.controller'

export default class UseRoutes {
  private _router: Router
  private controller: UserController

  constructor() {
    this._router = Router()
    this.controller = new UserController()
  }

  routes(): Router {
    this._router.get('/', this.controller.getUsers())
    this._router.get('/:id', this.controller.findUser())
    this._router.post('/new', this.controller.createUser())
    this._router.patch('/update/:id', this.controller.updateUser())
    this._router.delete('/:id', this.controller.deleteUser())

    return this._router
  }
}