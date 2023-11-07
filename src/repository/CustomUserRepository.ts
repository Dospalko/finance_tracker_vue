import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

export const CustomUserRepository = {
    async findByUsername(username: string): Promise<User | undefined> {
        const userRepository: Repository<User> = getRepository(User);
        const user = await userRepository.findOne({ where: { username } });
        return user || undefined;
    },

    // ... other custom methods
};
