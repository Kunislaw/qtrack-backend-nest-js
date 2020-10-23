import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Client } from 'src/clients/clients.entity';
import { ClientsService } from 'src/clients/clients.service';
import { CreateNewClientDTO } from 'src/clients/dto/create-new-client.dto';
import { GetClientDTO } from 'src/clients/dto/get-client.dto';
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
                @InjectRepository(Client) private clientsRepository : Repository<Client>) {}

    async getAllVehicles(){
        return await this.vehiclesRepository.find({});
    }

    async getVehicle(getVehicleDto : GetVehicleDTO){
        return await this.vehiclesRepository.findOne({id: getVehicleDto.id});
    }

    async createVehicle(createVehicleDto : CreateVehicleDTO){
        let newVehicle = new Vehicle();

        if(createVehicleDto.VinNumber) newVehicle.VinNumber = createVehicleDto.VinNumber;
        if(createVehicleDto.engineCapacity) newVehicle.engineCapacity = createVehicleDto.engineCapacity;
        if(createVehicleDto.fuelType) newVehicle.fuelType = createVehicleDto.fuelType;
        if(createVehicleDto.mark) newVehicle.mark = createVehicleDto.mark;
        if(createVehicleDto.model) newVehicle.model = createVehicleDto.model;
        if(createVehicleDto.odometer) newVehicle.odometer = createVehicleDto.odometer;
        if(createVehicleDto.plate) newVehicle.plate = createVehicleDto.plate;
        if(createVehicleDto.tankCapacity) newVehicle.tankCapacity = createVehicleDto.tankCapacity;
        if(createVehicleDto.yearOfProduction) newVehicle.yearOfProduction = createVehicleDto.yearOfProduction;
        if(createVehicleDto.clientId && createVehicleDto.clientId !== null){
            let client = await this.clientsRepository.findOne({id: createVehicleDto.clientId});
            if(client){
                newVehicle.client = client;
            }
        }
        if(createVehicleDto.clientId === null){
            newVehicle.client = null;
        }
        return await this.vehiclesRepository.save(newVehicle);
    }
    
    async deleteVehicle(deleteVehicleDto : DeleteVehicleDTO){
        let searchVehicle = await this.vehiclesRepository.findOne({id: deleteVehicleDto.id});
        if(searchVehicle){
            await this.vehiclesRepository.remove(searchVehicle);
            return true;
        } else {
            return false;
        }
    }

    async editVehicle(editVehicleDto : EditVehicleDTO){
        let searchVehicle = await this.vehiclesRepository.findOne({id: editVehicleDto.id});
        if(searchVehicle){
            let anyChanges = false;
            if(editVehicleDto.VinNumber){
                searchVehicle.VinNumber = editVehicleDto.VinNumber;
                anyChanges = true;
            }
            if(editVehicleDto.engineCapacity){
                searchVehicle.engineCapacity = editVehicleDto.engineCapacity;
                anyChanges = true;
            }
            if(editVehicleDto.fuelType){
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
            if(editVehicleDto.odometer){
                searchVehicle.odometer = editVehicleDto.odometer;
                anyChanges = true;
            }
            if(editVehicleDto.plate){
                searchVehicle.plate = editVehicleDto.plate;
                anyChanges = true;
            }
            if(editVehicleDto.tankCapacity){
                searchVehicle.tankCapacity = editVehicleDto.tankCapacity;
                anyChanges = true;
            }
            if(editVehicleDto.yearOfProduction){
                searchVehicle.yearOfProduction = editVehicleDto.yearOfProduction;
                anyChanges = true;
            }
            if(editVehicleDto.clientId && editVehicleDto.clientId !== null){
                let client = await this.clientsRepository.findOne({id: editVehicleDto.clientId});
                if(client){
                    searchVehicle.client = client;
                    anyChanges = true;
                }
            }
            if(editVehicleDto.clientId === null){
                searchVehicle.client = null;
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

    async getAllClientVehicles(getAllClientVehiclesDto : GetAllClientVehiclesDTO){
        let clientVehicles = await this.clientsRepository.findOne({where: {id: getAllClientVehiclesDto.id}, relations:["vehicles"]});
        if(clientVehicles) return clientVehicles.vehicles;
        else return [];
    }

}
