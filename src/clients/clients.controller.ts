import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClientsService } from './clients.service';
import { CreateNewClientDTO } from './dto/create-new-client.dto';
import { DeleteClientDTO } from './dto/delete-client.dto';
import { EditClientDTO } from './dto/edit-client.dto';
import { GetClientDTO } from './dto/get-client.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService){}

    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAllClients(){
        return this.clientsService.getClients();
    }

    @Get("get")
    @UseGuards(JwtAuthGuard)
    getClient(@Body() getClientDto: GetClientDTO){
        return this.clientsService.getClient(getClientDto);
    }
    
    @Post("create")
    @UseGuards(JwtAuthGuard)
    createNewClient(@Body() createNewClientDto : CreateNewClientDTO){
        return this.clientsService.createNewClient(createNewClientDto);
    }


    @Put("edit")
    @UseGuards(JwtAuthGuard)
    editClient(@Body() editClientDto: EditClientDTO){
        return this.clientsService.editClient(editClientDto);
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard)
    deleteClient(@Param("id") clientId){
        return this.clientsService.deleteClient(clientId);
    }


}
