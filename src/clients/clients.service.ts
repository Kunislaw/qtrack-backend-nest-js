import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './clients.entity';

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Client) private clientsRepository : Repository<Client>){}

    findAll(): Promise<Client[]> {
        return this.clientsRepository.find();
    }
}
