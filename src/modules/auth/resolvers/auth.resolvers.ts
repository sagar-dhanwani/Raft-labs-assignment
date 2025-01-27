import { Resolver, Mutation, Arg, } from 'type-graphql';
import { AuthService } from '../services/authService';
import { AuthResponse } from './authResponse';

@Resolver()
export class AuthResolver {
  private authService = new AuthService();

  @Mutation(() => AuthResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthResponse> {
    const user = await this.authService.register(email, password);
    const token = await this.authService.generateToken(user);
    return { user, token };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthResponse> {
    const token = await this.authService.login(email, password);
    const user = await this.authService.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return { user, token };
  }
}