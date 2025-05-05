import User from '#models/user';

interface UserInput {
    name?: string;
    email: string;
    password: string;
}

export default class UserService {
  static async create(data: UserInput) {
    return User.create(data);
  }

  static async findAll() {
    return User.all();
  }

  static async findById(id: number) {
    return User.find(id);
  }

  static async update(id: number, data: UserInput) {
    const user = await User.find(id);

    return user?.merge(data).save();
  }

  static async delete(id: number) {
    const user = await User.find(id);

    return user?.delete();
  }
}