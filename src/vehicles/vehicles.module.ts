import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicles.entity';
import { Client } from 'src/clients/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Client])],
  providers: [VehiclesService],
  controllers: [VehiclesController]
})
export class VehiclesModule {}
