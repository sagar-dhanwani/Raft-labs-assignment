import bcrypt from 'bcrypt';
import { UserModel, User } from '../schema/userSchema';

export class UserService {
  async getUserById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    return await user.save();
  }
}
