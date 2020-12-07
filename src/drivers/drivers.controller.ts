import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Params } from 'nest-mqtt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
    @UseGuards(JwtAuthGuard)
    getAllDrivers(){
        return this.driversService.getAllDrivers();
    }

    @Get("get")
    @UseGuards(JwtAuthGuard)
    getDriver(@Body() getDriverDto : GetDriverDTO){
        return this.driversService.getDriver(getDriverDto);
    }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    createDriver(@Body() createDriverDto : CreateDriverDTO){
        return this.driversService.createDriver(createDriverDto);
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard)
    deleteDriver(@Param("id") driverId){
        return this.driversService.deleteDriver(driverId);
    }
    @Put("edit")
    @UseGuards(JwtAuthGuard)
    editDriver(@Body() editDriverDto : EditDriverDTO){
        return this.driversService.editDriver(editDriverDto);
    }
    @Get("client/:id")
    @UseGuards(JwtAuthGuard)
    getAllClientDrivers(@Param("id") clientId){
        return this.driversService.getAllClientDrivers(clientId);
    }
}
