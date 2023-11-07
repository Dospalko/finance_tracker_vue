import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  generateToken(userId: number): string {
    return sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // Token expires in one hour
    });
  }
}
