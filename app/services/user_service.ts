import User from '#models/user'
import { ConflictError, DatabaseError, NotFoundErr } from '#exceptions/api_error_exception'

interface UserInput {
  name?: string
  email: string
  password: string
}

export default class UserService {
  async create(data: UserInput): Promise<User> {
    try {
      return await User.create(data)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictError('Email already exists')
      }
      throw new DatabaseError('Failed to create user')
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await User.all()
    } catch {
      throw new DatabaseError('Error when fetching users')
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await User.find(id)
      if (!user) {
        throw new NotFoundErr('User not found')
      }
      return user
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when fetching user')
    }
  }

  async update(id: number, data: UserInput): Promise<User> {
    try {
      const user = await User.find(id)
      if (!user) {
        throw new NotFoundErr('User not found')
      }
      user.merge(data)
      await user.save()
      return user
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when updating user')
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const user = await User.find(id)
      if (!user) {
        throw new NotFoundErr('User not found')
      }
      await user.delete()
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when deleting user')
    }
  }
}
