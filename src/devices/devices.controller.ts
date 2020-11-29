import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateNewDeviceDTO } from './dto/create-new-device.dto';
import { DeleteDeviceDTO } from './dto/delete-device.dto';
import { EditDeviceDTO } from './dto/edit-device.dto';
import { GetAllClientDevicesDTO } from './dto/get-all-client-devices.dto';
import { GetDeviceDTO } from './dto/get-device.dto';

@Controller('devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService){}

    @Get()
    getAllDevices(){
        return this.devicesService.getAllDevices();
    }

    @Get("get")
    getDevice(@Body() getDeviceDto : GetDeviceDTO){
        return this.devicesService.getDevice(getDeviceDto);
    }

    @Post("create")
    createDevice(@Body() createNewDeviceDto : CreateNewDeviceDTO){
        return this.devicesService.createNewDevice(createNewDeviceDto);
    }

    @Delete("delete/:id")
    deleteDevice(@Param("id") deviceId){
        return this.devicesService.deleteDevice(deviceId);
    }

    @Put("edit")
    editDevice(@Body() editDeviceDto : EditDeviceDTO){
        return this.devicesService.editDevice(editDeviceDto);
    }

    @Get("client/:id")
    getAllClientsDevices(@Param("id") clientId){
        return this.devicesService.getAllClientDevices(clientId);
    }



}
