import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
    @UseGuards(JwtAuthGuard)
    getAllDevices(){
        return this.devicesService.getAllDevices();
    }

    @Get("get")
    @UseGuards(JwtAuthGuard)
    getDevice(@Body() getDeviceDto : GetDeviceDTO){
        return this.devicesService.getDevice(getDeviceDto);
    }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    createDevice(@Body() createNewDeviceDto : CreateNewDeviceDTO){
        return this.devicesService.createNewDevice(createNewDeviceDto);
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard)
    deleteDevice(@Param("id") deviceId){
        return this.devicesService.deleteDevice(deviceId);
    }

    @Put("edit")
    @UseGuards(JwtAuthGuard)
    editDevice(@Body() editDeviceDto : EditDeviceDTO){
        return this.devicesService.editDevice(editDeviceDto);
    }

    @Get("client/:id")
    @UseGuards(JwtAuthGuard)
    getAllClientsDevices(@Param("id") clientId){
        return this.devicesService.getAllClientDevices(clientId);
    }



}
