import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { User, UserModel } from '../schema/userSchema';
import { UserService } from '../services/userServices';


@Resolver(() => User)
export class UserResolver {
  private userService = new UserService();

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await this.userService.hashPassword(password);
    const user = new UserModel({ email, password: hashedPassword });
    return await user.save();
  }
}
