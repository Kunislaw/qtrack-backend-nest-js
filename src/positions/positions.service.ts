import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Packet, Params, Payload, Subscribe, Topic } from 'nest-mqtt';
import { Device } from 'src/devices/devices.entity';
import { Repository, MoreThan, LessThan, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import { CreatePositionDTO } from './dto/create-position.dto';
import { DeletePositionDTO } from './dto/delete-position.dto';
import { EditPositionDTO } from './dto/edit-positions.dto';
import { GetAllDevicePositionsDTO } from './dto/get-all-device-positions.dto';
import { GetPositionDTO } from './dto/get-position.dto';
import { GetPositionsFromToDTO } from './dto/get-positions-from-to.dto';
import { Position } from './positions.entity';

@Injectable()
export class PositionsService {
    constructor(@InjectRepository(Position) private positionsRepository: Repository<Position>,
                @InjectRepository(Device) private devicesRepository: Repository<Device>){}

    async getAllPositions(){
        return await this.positionsRepository.find({});
    }

    async getPosition(getPositionDto : GetPositionDTO){
        return await this.positionsRepository.find({id: getPositionDto.id});
    }

    async createPosition(createPositionDto : CreatePositionDTO){
        let newPosition = new Position();
        if(createPositionDto.altitude) newPosition.altitude = createPositionDto.altitude;
        if(createPositionDto.latitude) newPosition.latitude = createPositionDto.latitude;
        if(createPositionDto.longitude) newPosition.longitude = createPositionDto.longitude;
        if(createPositionDto.speed) newPosition.speed = createPositionDto.speed;
        if(createPositionDto.utcTimestamp) newPosition.utcTimestamp = createPositionDto.utcTimestamp;
        if(createPositionDto.deviceId && createPositionDto.deviceId !== null){
            let searchDevice = await this.devicesRepository.findOne({id: createPositionDto.deviceId});
            if(searchDevice){
                newPosition.device = searchDevice;
            }
        }
        if(createPositionDto.deviceId === null){
            newPosition.device = null;
        }
    }

    async deletePosition(deletePositionDto : DeletePositionDTO){
        let searchPosition = await this.positionsRepository.findOne({id: deletePositionDto.id})
    }

    async editPosition(editPositionDto : EditPositionDTO){
        let searchPosition = await this.positionsRepository.findOne({id: editPositionDto.id});
        if(searchPosition){
            let anyChanges = false;
            if(editPositionDto.altitude){
                searchPosition.altitude = editPositionDto.altitude;
                anyChanges = true;
            }
            if(editPositionDto.latitude){
                searchPosition.latitude = editPositionDto.latitude;
                anyChanges = true;
            }
            if(editPositionDto.longitude){
                searchPosition.longitude = editPositionDto.longitude;
                anyChanges = true;
            }
            if(editPositionDto.speed){
                searchPosition.speed = editPositionDto.speed;
                anyChanges = true;
            }
            if(editPositionDto.utcTimestamp){
                searchPosition.utcTimestamp = editPositionDto.utcTimestamp;
                anyChanges = true;
            }
            if(editPositionDto.deviceId && editPositionDto.deviceId !== null){
                let searchDevice = await this.devicesRepository.findOne({id: editPositionDto.deviceId});
                if(searchDevice){
                    searchPosition.device = searchDevice;
                    anyChanges = true;
                }
            }
            if(editPositionDto.deviceId === null){
                searchPosition.device = null;
                anyChanges = true;
            }
            if(anyChanges){
                return await this.positionsRepository.save(searchPosition);
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    async getAllDevicePositions(deviceId){
        return await this.positionsRepository.find({where: {device: deviceId}})
    }

    async getDevicesPositionsFromTo(getPositionsFromToDto: GetPositionsFromToDTO){
        return await this.positionsRepository.find({where: {device: getPositionsFromToDto.deviceId, utcTimestamp: Between(getPositionsFromToDto.from.getTime(), getPositionsFromToDto.to.getTime())}});
    }


    @Subscribe('client/+/device/+/position')
    newPositionFromDevice(@Topic() topic, @Packet() packet, @Params() params) {
        let deviceId = params[0];
        console.log("DeviceID", deviceId);
        console.log("TOPIC", topic);
        console.log("PAYLOAD", packet.payload);
    }
}
