import User from '#models/user';

interface UserInput {
    name?: string;
    email: string;
    password: string;
}

export default class UserService {
  async create(data: UserInput) {
    return User.create(data);
  }

  async findAll() {
    return User.all();
  }

  async findById(id: number) {
    return User.find(id);
  }

  async update(id: number, data: UserInput) {
    const user = await User.find(id);

    return user?.merge(data).save();
  }

  async delete(id: number) {
    const user = await User.find(id);

    return user?.delete();
  }
}