import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './clients.entity';
import { CreateNewClientDTO } from "./dto/create-new-client.dto"
import { DeleteClientDTO } from './dto/delete-client.dto';
import { EditClientDTO } from './dto/edit-client.dto';
import { GetClientDTO } from './dto/get-client.dto';
@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Client) private clientsRepository : Repository<Client>){}

    findAll(): Promise<Client[]> {
        return this.clientsRepository.find();
    }

    async createNewClient(createNewClientDto : CreateNewClientDTO) {
        let newClient = new Client();
        newClient.clientName = createNewClientDto.clientName;
        newClient.isCompany = createNewClientDto.isCompany;
        newClient.clientAddress = createNewClientDto.clientAddress;
        return await this.clientsRepository.save(newClient);
    }

    async deleteClient(deleteClientDto : DeleteClientDTO){
        //return await this.clientsRepository.remove({id: deleteClientDto.id});
    }

    async getClient(getClientDto : GetClientDTO){
        return await this.clientsRepository.findOne({id: getClientDto.id});
    }

    async editClient(editClientDto : EditClientDTO){

    }
}
