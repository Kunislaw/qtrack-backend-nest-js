import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/clients.entity';
import { Vehicle } from 'src/vehicles/vehicles.entity';
import { DriversController } from './drivers.controller';
import { Driver } from './drivers.entity';
import { DriversService } from './drivers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Client, Vehicle])],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
