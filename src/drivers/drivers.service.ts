import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Client } from 'src/clients/clients.entity';
import { GetAllClientDevicesDTO } from 'src/devices/dto/get-all-client-devices.dto';
import { Vehicle } from 'src/vehicles/vehicles.entity';
import { Repository } from 'typeorm';
import { serialize } from 'v8';
import { Driver } from './drivers.entity';
import { CreateDriverDTO } from './dto/create-driver.dto';
import { DeleteDriverDTO } from './dto/delete-driver.dto';
import { EditDriverDTO } from './dto/edit-driver.dto';
import { GetDriverDTO } from './dto/get-driver.dto';

@Injectable()
export class DriversService {
    constructor(@InjectRepository(Driver) private driversRepository : Repository<Driver>,
                @InjectRepository(Client) private clientsRepository : Repository<Client>,
                @InjectRepository(Vehicle) private vehiclesRepository : Repository<Vehicle>){}

    async getAllDrivers(){
        return await this.driversRepository.find();
    }

    async getDriver(getDriverDto : GetDriverDTO){
        return await this.driversRepository.findOne({id: getDriverDto.id});
    }

    async deleteDriver(driverId){
        let searchDriver = await this.driversRepository.findOne({id: driverId});
        if(searchDriver){
            await this.driversRepository.remove(searchDriver);
            return true;
        } else {
            return false;
        }
    }

    async editDriver(editDriverDto : EditDriverDTO){
        let searchDriver = await this.driversRepository.findOne({id: editDriverDto.id});
        if(searchDriver){
            let anyChanges = false;
            if(editDriverDto.firstName){
                searchDriver.firstName = editDriverDto.firstName;
                anyChanges = true;
            }
            if(editDriverDto.lastName){
                searchDriver.lastName = editDriverDto.lastName;
                anyChanges = true;
            }
            if(editDriverDto.phone){
                searchDriver.phone = editDriverDto.phone;
                anyChanges = true;
            }
            if(editDriverDto.position){
                searchDriver.position = editDriverDto.position;
                anyChanges = true;
            }
            if(editDriverDto.clientId && editDriverDto.clientId !== null){
                let searchClient = await this.clientsRepository.findOne({id: editDriverDto.clientId});
                if(searchClient){
                    searchDriver.client = searchClient;
                    anyChanges = true;
                }
            }
            if(editDriverDto.vehicleId && editDriverDto.vehicleId !== null){
                let searchVehicle = await this.vehiclesRepository.findOne({id: editDriverDto.vehicleId});
                if(searchVehicle){
                    searchDriver.vehicle = searchVehicle;
                    anyChanges = true;
                }
            }
            if(editDriverDto.clientId === null){
                searchDriver.client = null;
                anyChanges = true;
            }
            if(editDriverDto.vehicleId === null){
                searchDriver.vehicle = null;
                anyChanges = true;
            }
            if(anyChanges){
                return await this.driversRepository.save(searchDriver);
            } else {
                return {i: false};
            }
        }
    }

    async createDriver(createDriverDto : CreateDriverDTO){
        let newDriver = new Driver();
        newDriver.firstName = createDriverDto.firstName;
        newDriver.lastName = createDriverDto.lastName;
        newDriver.phone = createDriverDto.phone;
        newDriver.position = createDriverDto.position;
        if(createDriverDto.clientId && createDriverDto.clientId !== null){
            let searchClient = await this.clientsRepository.findOne({id: createDriverDto.clientId});
            if(searchClient){
                newDriver.client = searchClient;
            }
        }
        if(createDriverDto.vehicleId && createDriverDto.vehicleId !== null){
            let searchVehicle = await this.vehiclesRepository.findOne({id: createDriverDto.vehicleId});
            if(searchVehicle){
                newDriver.vehicle = searchVehicle;
            }
        }
        if(createDriverDto.clientId === null) newDriver.client = null;
        if(createDriverDto.vehicleId === null) newDriver.vehicle = null;
        return await this.driversRepository.save(newDriver);
    }



    async getAllClientDrivers(clientId){
        let clientDrivers = await this.driversRepository.find({where: {client: clientId}, order: {lastName: "ASC"}});
        return clientDrivers;
    }


}
