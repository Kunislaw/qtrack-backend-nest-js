import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    getAllVehicles(){
        return this.vehiclesService.getAllVehicles();
    }

    @Get("client/:id")
    getAllClientVehicles(@Param("id") clientId){
        return this.vehiclesService.getAllClientVehicles(clientId);
    }

    @Get("get")
    getVehicle(@Body() getVehicleDto : GetVehicleDTO){
        return this.vehiclesService.getVehicle(getVehicleDto);
    }
    @Post("create")
    createVehicle(@Body() createVehicleDto : CreateVehicleDTO){
        return this.vehiclesService.createVehicle(createVehicleDto);
    }
    @Delete("delete/:id")
    deleteVehicle(@Param("id") vehicleId){
        return this.vehiclesService.deleteVehicle(vehicleId);
    }
    @Put("edit")
    editVehicle(@Body() editVehicleDto : EditVehicleDTO){
        return this.vehiclesService.editVehicle(editVehicleDto);
    }
}
