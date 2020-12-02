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
        let clientId = params[0];
        let deviceId = params[1];
        let payload = packet.payload;
        // .month = 12,
        // .day = 2,
        // .hour = 21,
        // .minutes = 6,
        // .seconds = 12

        let speed = Buffer.from(payload.slice(0,4)).readFloatLE(0);
        let altitude = Buffer.from(payload.slice(4,8)).readFloatLE(0);
        let latitude = Buffer.from(payload.slice(8,12)).readFloatLE(0);
        let longitude = Buffer.from(payload.slice(12,16)).readFloatLE(0);
        let year = Buffer.from(payload.slice(16,18)).readUInt16LE(0);
        let month = Buffer.from(payload.slice(18,19)).readUInt8(0);
        let day = Buffer.from(payload.slice(19,20)).readUInt8(0);
        let hour = Buffer.from(payload.slice(20,21)).readUInt8(0);
        let minutes = Buffer.from(payload.slice(21,22)).readUInt8(0);
        let seconds = Buffer.from(payload.slice(22,23)).readUInt8(0);
        console.error("ClientID", clientId);
        console.error("DeviceID", deviceId);
        console.error("TOPIC", topic);
        console.error("PAYLOAD", packet.payload);
        console.error("altitude",altitude);
        console.error("speed",speed);
        console.error("longitude",longitude);
        console.error("latitude",latitude);
        console.error("year",year);
        console.error("month",month);
        console.error("day",day);
        console.error("hour",hour);
        console.error("minutes",minutes);
        console.error("seconds",seconds);

    }
}
