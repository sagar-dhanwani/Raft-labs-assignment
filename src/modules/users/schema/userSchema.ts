import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @prop({ unique: true })
  email!: string;

  @prop()
  password!: string;
}

export const UserModel = getModelForClass(User);