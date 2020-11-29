import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/clients.entity';
import { CreateNewClientDTO } from 'src/clients/dto/create-new-client.dto';
import { Device } from 'src/devices/devices.entity';
import { Driver } from 'src/drivers/drivers.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { DeleteVehicleDTO } from './dto/delete-vehicle.dto';
import { EditVehicleDTO } from './dto/edit-vehicle.dto';
import { GetAllClientVehiclesDTO } from './dto/get-all-client-vehicles.dto';
import { GetVehicleDTO } from './dto/get-vehicle.dto';
import { Vehicle } from './vehicles.entity';

@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>,
                @InjectRepository(Client) private clientsRepository : Repository<Client>,
                @InjectRepository(Driver) private driversRepository : Repository<Driver>,
                @InjectRepository(Device) private devicesRepository : Repository<Device>) {}

    async getAllVehicles(){
        return await this.vehiclesRepository.find({});
    }

    async getVehicle(getVehicleDto : GetVehicleDTO){
        return await this.vehiclesRepository.findOne({where: {id: getVehicleDto.id}, relations: ["driver", "device"]});
    }

    async createVehicle(createVehicleDto : CreateVehicleDTO){
        let newVehicle = new Vehicle();
        if(createVehicleDto.vinNumber) newVehicle.vinNumber = createVehicleDto.vinNumber;
        if(createVehicleDto.engineCapacity) newVehicle.engineCapacity = createVehicleDto.engineCapacity;
        if(createVehicleDto.fuelType) newVehicle.fuelType = createVehicleDto.fuelType;
        if(createVehicleDto.mark) newVehicle.mark = createVehicleDto.mark;
        if(createVehicleDto.model) newVehicle.model = createVehicleDto.model;
        if(createVehicleDto.odometer) newVehicle.odometer = createVehicleDto.odometer;
        if(createVehicleDto.plate) newVehicle.plate = createVehicleDto.plate;
        if(createVehicleDto.tankCapacity) newVehicle.tankCapacity = createVehicleDto.tankCapacity;
        if(createVehicleDto.yearOfProduction) newVehicle.yearOfProduction = createVehicleDto.yearOfProduction;
        if(createVehicleDto.clientId){
            let client = await this.clientsRepository.findOne({id: createVehicleDto.clientId});
            if(client){
                newVehicle.client = client;
            }
        }
        if(createVehicleDto.driverId){
            let driver = await this.driversRepository.findOne({id: createVehicleDto.driverId});
            if(driver){
                newVehicle.driver = driver;
            }
        }
        if(createVehicleDto.deviceId){
            let device = await this.devicesRepository.findOne({id: createVehicleDto.deviceId});
            if(device){
                newVehicle.device = device;
            }
        }
        return await this.vehiclesRepository.save(newVehicle);
    }
    
    async deleteVehicle(vehicleId){
        let searchVehicle = await this.vehiclesRepository.findOne({id: vehicleId});
        if(searchVehicle){
            await this.vehiclesRepository.remove(searchVehicle);
            return {result: true};
        } else {
            return {result: false};
        }
    }

    async editVehicle(editVehicleDto : EditVehicleDTO){
        let searchVehicle = await this.vehiclesRepository.findOne({id: editVehicleDto.id});
        if(searchVehicle){
            let anyChanges = false;
            if(editVehicleDto.vinNumber || editVehicleDto.vinNumber === null){
                searchVehicle.vinNumber = editVehicleDto.vinNumber;
                anyChanges = true;
            }
            if(editVehicleDto.engineCapacity || editVehicleDto.engineCapacity === null){
                searchVehicle.engineCapacity = editVehicleDto.engineCapacity;
                anyChanges = true;
            }
            if(editVehicleDto.fuelType || editVehicleDto.fuelType === null){
                searchVehicle.fuelType = editVehicleDto.fuelType;
                anyChanges = true;
            }
            if(editVehicleDto.mark){
                searchVehicle.mark = editVehicleDto.mark;
                anyChanges = true;
            }
            if(editVehicleDto.model){
                searchVehicle.model = editVehicleDto.model;
                anyChanges = true;
            }
            if(editVehicleDto.odometer || editVehicleDto.odometer === null){
                searchVehicle.odometer = editVehicleDto.odometer;
                anyChanges = true;
            }
            if(editVehicleDto.plate){
                searchVehicle.plate = editVehicleDto.plate;
                anyChanges = true;
            }
            if(editVehicleDto.tankCapacity || editVehicleDto.tankCapacity === null){
                searchVehicle.tankCapacity = editVehicleDto.tankCapacity;
                anyChanges = true;
            }
            if(editVehicleDto.yearOfProduction || editVehicleDto.yearOfProduction === null){
                searchVehicle.yearOfProduction = editVehicleDto.yearOfProduction;
                anyChanges = true;
            }

            if(editVehicleDto.clientId){
                let client = await this.clientsRepository.findOne({id: editVehicleDto.clientId});
                if(client){
                    searchVehicle.client = client;
                    anyChanges = true;
                }
            }
            if(editVehicleDto.driverId){
                let driver = await this.driversRepository.findOne({id: editVehicleDto.driverId});
                if(driver){
                    searchVehicle.driver = null;
                    await this.vehiclesRepository.save(searchVehicle);
                    searchVehicle.driver = driver;
                    anyChanges = true;
                }
            }
            if(editVehicleDto.deviceId){
                let device = await this.devicesRepository.findOne({id: editVehicleDto.deviceId});
                if(device){
                    searchVehicle.device = device;
                    anyChanges = true;
                }
            }
            if(editVehicleDto.clientId === null){
                searchVehicle.client = null;
                anyChanges = true;
            }
            if(editVehicleDto.driverId === null){
                searchVehicle.driver = null;
                anyChanges = true;
            }
            if(editVehicleDto.deviceId === null){
                searchVehicle.device = null;
                anyChanges = true;
            }
            if(anyChanges){
                return await this.vehiclesRepository.save(searchVehicle);
            } else {
                return false;
            } 
        } else {
            return false;
        }
    }

    async getAllClientVehicles(clientId){
        return await this.vehiclesRepository.find({where: {client: clientId}, order: {plate: "ASC"}, relations: ["driver", "device"]});
    }

}
