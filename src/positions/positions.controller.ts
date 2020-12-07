import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeletePositionDTO } from './dto/delete-position.dto';
import { EditPositionDTO } from './dto/edit-positions.dto';
import { GetAllDevicePositionsDTO } from './dto/get-all-device-positions.dto';
import { GetPositionDTO } from './dto/get-position.dto';
import { GetPositionsFromToDTO } from './dto/get-positions-from-to.dto';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllPositions(){
        return this.positionsService.getAllPositions();
    }

    @Get("get")
    @UseGuards(JwtAuthGuard)
    getPositions(@Body() getPositionDto : GetPositionDTO){
        return this.positionsService.getPosition(getPositionDto);
    }

    @Delete("delete")
    @UseGuards(JwtAuthGuard)
    deletePositions(@Body() deletePositionDto : DeletePositionDTO){
        return this.positionsService.deletePosition(deletePositionDto);
    }

    @Put("edit")
    @UseGuards(JwtAuthGuard)
    editPosition(@Body() editPositionDto : EditPositionDTO){
        return this.positionsService.editPosition(editPositionDto);
    }

    @Get("device/:id")
    @UseGuards(JwtAuthGuard)
    getAllDevicePositions(@Param("id") deviceId){
        return this.positionsService.getAllDevicePositions(deviceId);
    }

    @Post("device/fromto")
    @UseGuards(JwtAuthGuard)
    getPositionsFromTo(@Body() getPositionsFromToDto : GetPositionsFromToDTO){
        return this.positionsService.getDevicesPositionsFromTo(getPositionsFromToDto);
    }

}
