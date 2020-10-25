import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { DevicesModule } from './devices/devices.module';
import { DriversModule } from './drivers/drivers.module';
import { PositionsModule } from './positions/positions.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { MqttModule } from 'nest-mqtt';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MqttModule.forRoot({
      host: "gps-tracking.pl",
      port: 1883,
      protocol: "mqtt"
    }),
    UsersModule,
    ClientsModule,
    DevicesModule,
    DriversModule,
    PositionsModule,
    VehiclesModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection){}
}
