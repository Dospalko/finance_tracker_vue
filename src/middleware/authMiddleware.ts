import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            User?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.User = decoded; // Pridáte si do Request typu vlastný user property v prípade potreby
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};