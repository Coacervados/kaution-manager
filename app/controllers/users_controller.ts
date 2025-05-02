import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { registerUserValidator } from '#validators/auth'

export default class UsersController {
    public async create({ request, response}: HttpContext) {
        const data = await request.validateUsing(registerUserValidator)
        const user = await UserService.create(data)
        return response.created(user)
    }
}