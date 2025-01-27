import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import logger from '../utils/logger';

export const verifyToken = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        logger.error('Authentication error: No token provided');
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET!);
        socket.data.user = decoded;
        next();
    } catch (err) {
        logger.error('Authentication error: Invalid token');
        next(new Error('Authentication error'));
    }
};