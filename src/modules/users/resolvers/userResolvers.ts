import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../schema/userSchema';
import { UserService } from '../services/userServices';

@Resolver()
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
    return this.userService.createUser(email, password);
  }
}
