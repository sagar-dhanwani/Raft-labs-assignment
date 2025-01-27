import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';
import { UserModel, User } from '../../users/schema/userSchema';
import logger from '../../../utils/logger';

export class AuthService {
  async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.error('Invalid email or password');
      throw new Error('Invalid email or password');
    }
    return this.generateToken(user);
  }

  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    return await user.save();
  }

  async generateToken(user: User): Promise<string> {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET as string, { expiresIn: '1h' });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }
}