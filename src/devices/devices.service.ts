import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './devices.entity';

@Injectable()
export class DevicesService {
    constructor(@InjectRepository(Device) private devicesRepository : Repository<Device>){}
}
