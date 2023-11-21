import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded: any = jwt.verify(token, 'secret'); // Replace 'secret' with your JWT secret
        const user = await getRepository(User).findOne(decoded.userId);
        if (!user) throw new Error('User not found');

        (req as any).user = user;
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
