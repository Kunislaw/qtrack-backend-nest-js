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
import { CalcCRC16 } from "../utils/crc16/crc16";
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
        return await this.positionsRepository.find({where: {device: getPositionsFromToDto.deviceId, utcTimestamp: Between(Math.round(new Date(getPositionsFromToDto.from).getTime()/1000), Math.round(new Date(getPositionsFromToDto.to).getTime()/1000))}, order: {utcTimestamp: "ASC"}});
    }


    @Subscribe('client/+/device/+/position')
    async newPositionFromDevice(@Topic() topic, @Packet() packet, @Params() params) {
        let clientId = params[0];
        let deviceId = params[1];
        let payload = packet.payload;
        console.error("ClientID", clientId);
        console.error("DeviceID", deviceId);
        console.error("TOPIC", topic);
        console.error("PAYLOAD", packet.payload);
        let searchDevice = await this.devicesRepository.findOne({where: {id: deviceId}});
        console.error("searchDevice", searchDevice);
        if(searchDevice && payload.length === 20){
            let speed = Buffer.from(payload.slice(0,4)).readFloatLE(0);
            let altitude = Buffer.from(payload.slice(4,8)).readFloatLE(0);
            let latitude = Buffer.from(payload.slice(8,12)).readFloatLE(0);
            let longitude = Buffer.from(payload.slice(12,16)).readFloatLE(0);
            let timestamp_utc = Buffer.from(payload.slice(16,20)).readUInt32LE(0);
            let newPosition = new Position();
            newPosition.device = searchDevice;
            newPosition.speed = speed;
            newPosition.altitude = altitude;
            newPosition.latitude = latitude;
            newPosition.longitude = longitude;
            newPosition.utcTimestamp = timestamp_utc;
            let newPositionWithId = await this.positionsRepository.save(newPosition);
            searchDevice.lastPosition = newPositionWithId;
            await this.devicesRepository.save(searchDevice);
            console.error("Nowa pozycja", packet.payload);
            console.error("altitude",altitude);
            console.error("speed",speed);
            console.error("longitude",longitude);
            console.error("latitude",latitude);
            console.error("timestamp_utc",timestamp_utc);
        }
        if(searchDevice && payload.length === 22){
            let speed = Buffer.from(payload.slice(0,4)).readFloatLE(0);
            let altitude = Buffer.from(payload.slice(4,8)).readFloatLE(0);
            let latitude = Buffer.from(payload.slice(8,12)).readFloatLE(0);
            let longitude = Buffer.from(payload.slice(12,16)).readFloatLE(0);
            let timestamp_utc = Buffer.from(payload.slice(16,20)).readUInt32LE(0);
            let crc16 = Buffer.from(payload.slice(20,22)).readUInt16LE(0);
            let calculatedCRC16 = CalcCRC16(payload.slice(0,20)); 
            if(crc16 === calculatedCRC16){
                let newPosition = new Position();
                newPosition.device = searchDevice;
                newPosition.speed = speed;
                newPosition.altitude = altitude;
                newPosition.latitude = latitude;
                newPosition.longitude = longitude;
                newPosition.utcTimestamp = timestamp_utc;
                let newPositionWithId = await this.positionsRepository.save(newPosition);
                searchDevice.lastPosition = newPositionWithId;
                await this.devicesRepository.save(searchDevice);
                console.error("Nowa pozycja CRC", packet.payload);
                console.error("altitude",altitude);
                console.error("speed",speed);
                console.error("longitude",longitude);
                console.error("latitude",latitude);
                console.error("timestamp_utc",timestamp_utc);
            } else {
                console.error("ZLE CRC Otrzymane: " + crc16 + " Obliczone: " + calculatedCRC16);
            }
        }
    }
}
