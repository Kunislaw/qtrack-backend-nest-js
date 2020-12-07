import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { DeleteVehicleDTO } from './dto/delete-vehicle.dto';
import { EditVehicleDTO } from './dto/edit-vehicle.dto';
import { GetAllClientVehiclesDTO } from './dto/get-all-client-vehicles.dto';
import { GetVehicleDTO } from './dto/get-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService : VehiclesService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllVehicles(){
        return this.vehiclesService.getAllVehicles();
    }

    @Get("client/:id")
    @UseGuards(JwtAuthGuard)
    getAllClientVehicles(@Param("id") clientId){
        return this.vehiclesService.getAllClientVehicles(clientId);
    }

    @Get("get")
    @UseGuards(JwtAuthGuard)
    getVehicle(@Body() getVehicleDto : GetVehicleDTO){
        return this.vehiclesService.getVehicle(getVehicleDto);
    }
    @Post("create")
    @UseGuards(JwtAuthGuard)
    createVehicle(@Body() createVehicleDto : CreateVehicleDTO){
        return this.vehiclesService.createVehicle(createVehicleDto);
    }
    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard)
    deleteVehicle(@Param("id") vehicleId){
        return this.vehiclesService.deleteVehicle(vehicleId);
    }
    @Put("edit")
    @UseGuards(JwtAuthGuard)
    editVehicle(@Body() editVehicleDto : EditVehicleDTO){
        return this.vehiclesService.editVehicle(editVehicleDto);
    }
}
