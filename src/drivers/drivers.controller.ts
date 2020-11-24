import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Params } from 'nest-mqtt';
import { GetAllClientDevicesDTO } from 'src/devices/dto/get-all-client-devices.dto';
import { DriversService } from './drivers.service';
import { CreateDriverDTO } from './dto/create-driver.dto';
import { DeleteDriverDTO } from './dto/delete-driver.dto';
import { EditDriverDTO } from './dto/edit-driver.dto';
import { GetDriverDTO } from './dto/get-driver.dto';

@Controller('drivers')
export class DriversController {
    constructor(private readonly driversService : DriversService){}

    @Get()
    getAllDrivers(){
        return this.driversService.getAllDrivers();
    }

    @Get("get")
    getDriver(@Body() getDriverDto : GetDriverDTO){
        return this.driversService.getDriver(getDriverDto);
    }

    @Post("create")
    createDriver(@Body() createDriverDto : CreateDriverDTO){
        return this.driversService.createDriver(createDriverDto);
    }

    @Delete("delete")
    deleteDriver(@Body() deleteDriverDto : DeleteDriverDTO){
        return this.driversService.deleteDriver(deleteDriverDto);
    }
    @Put("edit")
    editDriver(@Body() editDriverDto : EditDriverDTO){
        return this.driversService.editDriver(editDriverDto);
    }
    @Get("client/:id")
    getAllClientDrivers(@Param("id") clientId){
        return this.driversService.getAllClientDrivers(clientId);
    }
}
