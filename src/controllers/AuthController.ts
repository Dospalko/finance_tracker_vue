import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { CreateUserDto } from '../dto/CreateUserDto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { User } from '../entity/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
    const userRepository = getRepository(User);
    const { username, password } = req.body;
    const createUserDto = plainToInstance(CreateUserDto, { username, password });
    const errors = await validate(createUserDto);
    if (errors.length > 0) return res.status(400).json(errors);

    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) return res.status(409).json({ message: 'Username is already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({ username, password: hashedPassword });
    await userRepository.save(newUser);
    return res.status(201).json(newUser);
});

router.post('/login', async (req, res) => {
    const userRepository = getRepository(User);
    const { username, password } = req.body;
    const loginUserDto = plainToInstance(LoginUserDto, { username, password });
    const errors = await validate(loginUserDto);
    if (errors.length > 0) return res.status(400).json(errors);

    const user = await userRepository.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' }); // Replace 'secret' with your JWT secret
    return res.json({ token });
});

export default router;
