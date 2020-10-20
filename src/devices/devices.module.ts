import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/clients.entity';
import { Vehicle } from 'src/vehicles/vehicles.entity';
import { DevicesController } from './devices.controller';
import { Device } from './devices.entity';
import { DevicesService } from './devices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Client, Vehicle])],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
