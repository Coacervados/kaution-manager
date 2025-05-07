import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { registerUserValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import User from '#models/user'

export default class UsersController {
  @inject()
  async create({ request, response }: HttpContext, userService: UserService) {
    try {

      const data = await request.validateUsing(registerUserValidator)
      const user = await userService.create(data)

      const token = await User.accessTokens.create(user)
    
      return response.created({ user, token})
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  @inject()
  async getAll({ response }: HttpContext, userService: UserService) {
    try {
      const users = await userService.findAll()
      return response.ok(users)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Error when searching for users' })
    }
  }

  @inject()
  async getById({ params, response }: HttpContext, userService: UserService) {
    try {
      const user = await userService.findById(params.id)
      if (!user) {
        return response.notFound({ message: 'User not found' })
      }
      return response.ok(user)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Error when searching for user' })
    }
  }

  @inject()
  async update({ params, request, response }: HttpContext, userService: UserService) {
    try {
      const data = await request.validateUsing(registerUserValidator)
      return response.ok(userService.update(params.id, data))
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  @inject()
  async delete({ params, response }: HttpContext, userService: UserService) {
    try {
      return response.ok(userService.delete(params.id))
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
}
