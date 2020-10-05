import { Client } from "../clients/clients.entity";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

@Entity("vehicles")
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mark: string;

    @Column()
    model: string;

    @Column()
    yearOfProduction: string;

    @Column()
    VinNumber: string;

    @Column()
    tankCapacity: number;

    @Column()
    engineCapacity: number

    @Column()
    fuelType: string;

    @Column()
    odometer: number;

    @Column()
    plate: string;

    @ManyToOne(type => Client, client => client.vehicles)
    client: Client;

}