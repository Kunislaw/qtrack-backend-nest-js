import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { DeletePositionDTO } from './dto/delete-position.dto';
import { EditPositionDTO } from './dto/edit-positions.dto';
import { GetAllDevicePositionsDTO } from './dto/get-all-device-positions.dto';
import { GetPositionDTO } from './dto/get-position.dto';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {}

    @Get()
    getAllPositions(){
        return this.positionsService.getAllPositions();
    }

    @Get("get")
    getPositions(@Body() getPositionDto : GetPositionDTO){
        return this.positionsService.getPosition(getPositionDto);
    }

    @Delete("delete")
    deletePositions(@Body() deletePositionDto : DeletePositionDTO){
        return this.positionsService.deletePosition(deletePositionDto);
    }

    @Put("edit")
    editPosition(@Body() editPositionDto : EditPositionDTO){
        return this.positionsService.editPosition(editPositionDto);
    }

    @Get("device")
    getAllDevicePositions(getAllDevicePositionsDto : GetAllDevicePositionsDTO){
        return this.positionsService.getAllDevicePositions(getAllDevicePositionsDto);
    }

}
