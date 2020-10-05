import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './drivers.entity';

@Injectable()
export class DriversService {
    constructor(@InjectRepository(Driver) private driversRepository: Repository<Driver>){}
}
