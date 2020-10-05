import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './positions.entity';

@Injectable()
export class PositionsService {
    constructor(@InjectRepository(Position) private positionsRepository: Repository<Position>){}
}
