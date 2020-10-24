import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicles.entity';
import { Client } from 'src/clients/clients.entity';
import { Device } from 'src/devices/devices.entity';
import { Driver } from 'src/drivers/drivers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Client, Driver, Device])],
  providers: [VehiclesService],
  controllers: [VehiclesController]
})
export class VehiclesModule {}
