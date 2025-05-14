import { type HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { registerUserValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import User from '#models/user'

//Alterar as rotas quando tiver a view

export default class UsersController {
  @inject()
  async create({ request, response, session }: HttpContext, userService: UserService) {
    try {
      const data = await request.validateUsing(registerUserValidator)
      const user = await userService.create(data)
      const token = await User.accessTokens.create(user)

      session.flash('success', 'User created successfully')
      //return response.cookie('token', token).redirect('/users/success')

      return response.ok({
        redirect: '/users/success',
        flash: session.flash('success', 'User created successfully'),
        token,
      })
    } catch (error) {
      session.flash('error', 'Error when creating user')
      console.log(error)
      //return response.redirect('/users/error')

      return response.badRequest({
        redirect: '/users/error',
        flash: session.flash('error', 'Error when creating user'),
        error,
      })
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
  async getById({ params, response, auth }: HttpContext, userService: UserService) {
    try {
      const user = await userService.findById(params.id)
      if (!user) {
        return response.notFound({
          redirect: '/users-error',
          flash: session.flash('error', 'User not found'),
        })
      }
      return response.ok({
        redirect: '/users',
        flash: session.flash('sucess', user),
        user,
      })
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        redirect: '/users-error',
        flash: session.flash('error', 'Error when searching for user'),
        error,
      })
    }
  }

  @inject()
  async update({ params, request, response, session }: HttpContext, userService: UserService) {
    try {
      const data = await request.validateUsing(registerUserValidator)
      const user = await userService.update(params.id, data)

      return response.ok({
        redirect: '/users',
        flash: session.flash('sucess', user),
        user,
      })
    } catch (error) {
      return response.badRequest({
        redirect: '/users-error',
        flash: session.flash('error', 'Error when updating user'),
        error,
      })
    }
  }

  @inject()
  async delete({ params, response, session }: HttpContext, userService: UserService) {
    try {
      const user = await userService.delete(params.id)

      return response.ok({
        redirect: '/users',
        flash: session.flash('sucess', 'User deleted successfully'),
        user,
      })
    } catch (error) {
      return response.badRequest({
        redirect: '/users-error',
        flash: session.flash('error', 'Error when deleting user'),
        error,
      })
    }
  }
}
