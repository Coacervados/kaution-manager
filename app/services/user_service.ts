import User from '#models/user'

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
        throw new Error('Email already exists')
      }
      throw new Error('Failed to create user')
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await User.all()
    } catch {
      throw new Error('Error when fetching users')
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await User.find(id)
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch {
      throw new Error('Error when fetching user')
    }
  }

  async update(id: number, data: UserInput): Promise<User> {
    try {
      const user = await User.find(id)
      if (!user) {
        throw new Error('User not found')
      }
      user.merge(data)
      await user.save()
      return user
    } catch {
      throw new Error('Error when updating user')
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const user = await User.find(id)
      if (!user) {
        throw new Error('User not found')
      }
      await user.delete()
    } catch {
      throw new Error('Error when deleting user')
    }
  }
}
