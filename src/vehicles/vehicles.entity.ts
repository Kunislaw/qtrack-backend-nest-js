import { Client } from "../clients/clients.entity";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne} from "typeorm";
import { Device } from "src/devices/devices.entity";
import { Driver } from "src/drivers/drivers.entity";

@Entity("vehicles")
export class Vehicle {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    mark: string;

    @Column({nullable: false})
    model: string;

    @Column({nullable: true})
    yearOfProduction: number;

    @Column({nullable: true, unique: true})
    vinNumber: string;

    @Column({nullable: true})
    tankCapacity: number;

    @Column({nullable: true})
    engineCapacity: number

    @Column({nullable: true})
    fuelType: string;

    @Column({nullable: true})
    odometer: number;

    @Column({nullable: false, unique: true})
    plate: string;

    @ManyToOne(type => Client, client => client.vehicles)
    client: Client;

    @OneToOne(type => Device, device => device.vehicle)
    device: Device

    @OneToOne(type => Driver, driver => driver.vehicle)
    driver: Driver 
}