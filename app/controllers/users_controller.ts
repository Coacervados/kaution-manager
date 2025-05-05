import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { registerUserValidator } from '#validators/auth'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)
    const user = await UserService.create(data)
    console.log(user)
    return response.created(user)
  }

  async getAll({ response }: HttpContext) {
    return response.ok(UserService.findAll())
  }

  async getById({ params, response }: HttpContext) {
    return response.ok(UserService.findById(params.id))
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)
    return response.ok(UserService.update(params.id, data))
  }
}
