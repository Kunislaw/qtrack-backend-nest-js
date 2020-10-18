import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { Client } from 'src/clients/clients.entity';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, @InjectRepository(Client) private clientsRepository: Repository<Client>) {
    }

    async findOne(username: string): Promise<any | undefined>{
        return await this.usersRepository.findOne({email: username})
    }

    async create(createUserDto : CreateUserDTO): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        let newUser = new User();
        let client : Client = await this.clientsRepository.findOne({id: createUserDto.clientId});
        if(client){
            newUser.email = createUserDto.email;
            newUser.password = hashedPassword;
            newUser.firstName = createUserDto.firstName;
            newUser.lastName = createUserDto.lastName;
            newUser.client = client;
            return await this.usersRepository.save(newUser);
        } else {
            return null;
        }
    }
}
