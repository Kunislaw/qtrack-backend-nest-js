import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/devices/devices.entity';
import { PositionsController } from './positions.controller';
import { Position } from './positions.entity';
import { PositionsService } from './positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position, Device])],
  controllers: [PositionsController],
  providers: [PositionsService]
})
export class PositionsModule {}
