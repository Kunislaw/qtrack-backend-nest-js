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


    async getClients() {
        return await this.clientsRepository.find();
    }


    async createNewClient(createNewClientDto : CreateNewClientDTO) {
        let newClient = new Client();
        newClient.name = createNewClientDto.name;
        newClient.phone = createNewClientDto.phone;
        newClient.zipCode = createNewClientDto.zipCode;
        newClient.address = createNewClientDto.address;
        newClient.country = createNewClientDto.country;
        newClient.isCompany = createNewClientDto.isCompany;
        if(newClient.isCompany){
            newClient.companyName = createNewClientDto.companyName;
            newClient.companyTaxIdentifier = createNewClientDto.companyTaxIdentifier;
            newClient.firstName = null;
            newClient.lastName = null;
        } else {
            newClient.firstName = createNewClientDto.firstName;
            newClient.lastName = createNewClientDto.lastName;
            newClient.companyName = null;
            newClient.companyTaxIdentifier = null;
        }
        return await this.clientsRepository.save(newClient);
    }

    async deleteClient(clientId){
        let searchClient : Client = await this.clientsRepository.findOne({id: clientId});
        if(searchClient){
            await this.clientsRepository.remove(searchClient);
            return {result: true};
        } else {
            return {result: false};
        }
    }

    async getClient(getClientDto : GetClientDTO){
        return await this.clientsRepository.findOne({id: getClientDto.id});
    }

    async editClient(editClientDto : EditClientDTO){
        let searchClient : Client = await this.clientsRepository.findOne({id: editClientDto.id});
        if(searchClient){
            let anyChanges = false;
            if(editClientDto.name){
                searchClient.name = editClientDto.name;
                anyChanges = true;
            }
            if(editClientDto.phone){
                searchClient.phone = editClientDto.phone;
                anyChanges = true;
            }
            if(editClientDto.zipCode){
                searchClient.zipCode = editClientDto.zipCode;
                anyChanges = true;
            }
            if(editClientDto.address){
                searchClient.address = editClientDto.address;
                anyChanges = true;
            }
            if(editClientDto.country){
                searchClient.country = editClientDto.country;
                anyChanges = true;
            }
            if(editClientDto.isCompany){
                searchClient.isCompany = editClientDto.isCompany;
                anyChanges = true;
            }
            if(editClientDto.firstName || editClientDto.firstName === null){
                searchClient.firstName = editClientDto.firstName;
                anyChanges = true;
            }
            if(editClientDto.lastName || editClientDto.lastName === null){
                searchClient.lastName = editClientDto.lastName;
                anyChanges = true;
            }
            if(editClientDto.companyName || editClientDto.companyName === null){
                searchClient.companyName = editClientDto.companyName;
                anyChanges = true;
            }
            if(editClientDto.companyTaxIdentifier || editClientDto.companyTaxIdentifier === null){
                searchClient.companyTaxIdentifier = editClientDto.companyTaxIdentifier;
                anyChanges = true;
            }

            if(anyChanges){
                return await this.clientsRepository.save(searchClient);
            } else {
                return {result: false};
            }   
        } else {
            return {result: false};
        }
    }
}
