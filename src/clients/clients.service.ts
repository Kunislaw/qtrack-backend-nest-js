import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { serialize } from 'v8';
import { Client } from './clients.entity';
import { CreateNewClientDTO } from "./dto/create-new-client.dto"
import { DeleteClientDTO } from './dto/delete-client.dto';
import { EditClientDTO } from './dto/edit-client.dto';
import { GetClientDTO } from './dto/get-client.dto';
@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Client) private clientsRepository : Repository<Client>){}


    async getClients() {
        return await this.clientsRepository.find();
    }


    async createNewClient(createNewClientDto : CreateNewClientDTO) {
        let newClient = new Client();
        newClient.clientName = createNewClientDto.clientName;
        newClient.isCompany = createNewClientDto.isCompany;
        newClient.clientAddress = createNewClientDto.clientAddress;
        return await this.clientsRepository.save(newClient);
    }

    async deleteClient(deleteClientDto : DeleteClientDTO){
        let searchClient : Client = await this.clientsRepository.findOne({id: deleteClientDto.id});
        if(searchClient){
            await this.clientsRepository.remove(searchClient);
            return true;
        } else {
            return false;
        }
    }

    async getClient(getClientDto : GetClientDTO){
        return await this.clientsRepository.findOne({id: getClientDto.id});
    }

    async editClient(editClientDto : EditClientDTO){
        let searchClient : Client = await this.clientsRepository.findOne({id: editClientDto.id});
        if(searchClient){
            searchClient.clientAddress = editClientDto.clientAddress;
            searchClient.clientName = editClientDto.clientName;
            searchClient.isCompany = editClientDto.isCompany;
            return await this.clientsRepository.save(searchClient);
        } else {
            return false;
        }
    }
}
