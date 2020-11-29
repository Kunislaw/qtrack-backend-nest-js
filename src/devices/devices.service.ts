import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/clients.entity';
import { Vehicle } from 'src/vehicles/vehicles.entity';
import { Repository } from 'typeorm';
import { Device } from './devices.entity';
import { CreateNewDeviceDTO } from './dto/create-new-device.dto';
import { DeleteDeviceDTO } from './dto/delete-device.dto';
import { EditDeviceDTO } from './dto/edit-device.dto';
import { GetAllClientDevicesDTO } from './dto/get-all-client-devices.dto';
import { GetDeviceDTO } from './dto/get-device.dto';

@Injectable()
export class DevicesService {
    constructor(@InjectRepository(Device) private devicesRepository : Repository<Device>,
                @InjectRepository(Client) private clientsRepository : Repository<Client>,
                @InjectRepository(Vehicle) private vehiclesRepository : Repository<Vehicle>){}


    async getAllDevices(){
        return await this.devicesRepository.find();
    }


    async getDevice(getDeviceDto : GetDeviceDTO){
        return await this.devicesRepository.findOne({id: getDeviceDto.id});
    }

    async createNewDevice(createNewDeviceDto : CreateNewDeviceDTO){
        let newDevice = new Device();
        newDevice.ownName = createNewDeviceDto.ownName;
        if(createNewDeviceDto.clientId){
            let searchClient = await this.clientsRepository.findOne({id: createNewDeviceDto.clientId});
            if(searchClient){
                newDevice.client = searchClient;
            }
        }
        if(createNewDeviceDto.vehicleId){
            let searchVehicle = await this.vehiclesRepository.findOne({id: createNewDeviceDto.vehicleId})
            if(searchVehicle){
                newDevice.vehicle = searchVehicle;
            }
        }
        return await this.devicesRepository.save(newDevice);
    }



    async deleteDevice(deviceId){
        let searchDevice = await this.devicesRepository.findOne({id: deviceId});
        if(searchDevice){
            await this.devicesRepository.remove(searchDevice);
            return {result: true};
        } else {
            return {result: false};
        }
    }

    async editDevice(editDeviceDto : EditDeviceDTO){
        let searchDevice = await this.devicesRepository.findOne({id: editDeviceDto.id});
        if(searchDevice){
            let anyChanges = false;
            if(editDeviceDto.ownName){
                searchDevice.ownName = editDeviceDto.ownName;
                anyChanges = true;
            }
            if(editDeviceDto.clientId && editDeviceDto.clientId !== null){
                let searchClient = await this.clientsRepository.findOne({id: editDeviceDto.clientId});
                if (searchClient){
                    searchDevice.client = searchClient;
                    anyChanges = true;
                }
            }
            if(editDeviceDto.vehicleId && editDeviceDto.vehicleId !== null){
                let searchVehicle = await this.vehiclesRepository.findOne({id: editDeviceDto.vehicleId});
                if(searchVehicle){
                    searchDevice.vehicle = searchVehicle;
                    anyChanges = true;
                }
            }
            if(editDeviceDto.clientId === null){
                searchDevice.client = null;
                anyChanges = true;
            }
            if(editDeviceDto.vehicleId === null){
                searchDevice.vehicle = null;
                anyChanges = true;
            }
            if(anyChanges){
                return await this.devicesRepository.save(searchDevice);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async getAllClientDevices(clientId){
        return await this.devicesRepository.find({where: {client: clientId}, relations: ["vehicle"]})
    }
}
