import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateNewClientDTO } from './dto/create-new-client.dto';
import { DeleteClientDTO } from './dto/delete-client.dto';
import { EditClientDTO } from './dto/edit-client.dto';
import { GetClientDTO } from './dto/get-client.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService){}

    
    @Get()
    getAllClients(){
        return this.clientsService.getClients();
    }

    @Get("get")
    getClient(@Body() getClientDto: GetClientDTO){
        return this.clientsService.getClient(getClientDto);
    }
    
    @Post("create")
    createNewClient(@Body() createNewClientDto : CreateNewClientDTO){
        return this.clientsService.createNewClient(createNewClientDto);
    }


    @Put("edit")
    editClient(@Body() editClientDto: EditClientDTO){
        return this.clientsService.editClient(editClientDto);
    }

    @Delete("delete/:id")
    deleteClient(@Param("id") clientId){
        return this.clientsService.deleteClient(clientId);
    }


}
