import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateNewClientDTO } from './dto/create-new-client.dto';
import { DeleteClientDTO } from './dto/delete-client.dto';
import { EditClientDTO } from './dto/edit-client.dto';
import { GetClientDTO } from './dto/get-client.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService){}

    
    @Get()
    getClient(@Body() getClientDto: GetClientDTO){
        return this.clientsService.getClient(getClientDto);
    }
    
    @Post("create")
    createNewClient(@Body() createNewClientDto : CreateNewClientDTO){
        return this.clientsService.createNewClient(createNewClientDto);
    }

    @Delete("delete")
    deleteClient(@Body() deleteClientDto : DeleteClientDTO){
        return this.clientsService.deleteClient(deleteClientDto);
    }

    @Put("edit")
    editClient(@Body() editClientDto: EditClientDTO){
        return this.clientsService.editClient(editClientDto);
    }


}
