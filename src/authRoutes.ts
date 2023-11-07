// AuthController.ts
import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUserDto';
import { User } from './entity/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { authMiddleware } from './middleware/authMiddleware';

const router = Router();

router.post('/register', async (req, res) => {
    const userRepository = getRepository(User);
    const { username, password } = req.body;

    // Convert to DTO and validate
    const createUserDto = plainToInstance(CreateUserDto, { username, password });
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    // Check for existing user
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
        return res.status(409).json({ message: 'Username is already taken' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({ username, password: hashedPassword });

    // Save user to database
    await userRepository.save(newUser);

    return res.status(201).json(newUser);
});

router.post('/login', async (req, res) => {
    const userRepository = getRepository(User);
    const { username, password } = req.body;

    // Validate input
    const loginUserDto = plainToInstance(LoginUserDto, { username, password });
    const errors = await validate(loginUserDto);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    // Check for existing user
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

    return res.json({ token });
});


router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed!' });
});


export default router;
