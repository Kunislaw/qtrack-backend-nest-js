import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    private users: any[];
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
        this.users = [];
    }

    async findOne(username: string): Promise<any | undefined>{
        return this.users.find((user) => user.username === username);
    }

    async create(userData: any): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const userId = Date.now();

        this.users.push({
            userId: userId,
            username: userData.username,
            password: hashedPassword
        })
        return true;
    }
}
