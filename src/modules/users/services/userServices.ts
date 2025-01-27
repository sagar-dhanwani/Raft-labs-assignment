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
}
