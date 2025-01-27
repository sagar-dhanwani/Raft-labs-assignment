import { ObjectType, Field } from 'type-graphql';
import { User } from '../../users/schema/userSchema';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token!: string;

  @Field(() => User)
  user!: User;
}