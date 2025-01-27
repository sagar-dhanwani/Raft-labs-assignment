import { Resolver, Mutation, Arg } from 'type-graphql';
import { AuthService } from '../services/authService';
import { AuthResponse } from './authResponse';
import { User } from '../../users/schema/userSchema';

@Resolver()
export class AuthResolver {
  private authService = new AuthService();

  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   */
  @Mutation(() => AuthResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthResponse> {
    const user = await this.authService.register(email, password);
    const token = await this.authService.generateToken(user);
    return { user, token };
  }

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Login a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   */
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