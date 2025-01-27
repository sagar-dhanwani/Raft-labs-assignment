import { AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authChecker: AuthChecker<any> = ({ context }, roles): boolean => {
  const token = context.req.headers.authorization?.split(' ')[1];
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    context.user = decoded;
    return true;
  } catch (err) {
    return false;
  }
};