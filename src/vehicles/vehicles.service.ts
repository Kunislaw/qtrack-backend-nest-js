import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicles.entity';

@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>) {}
}
