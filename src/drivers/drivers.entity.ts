import { Client } from "../clients/clients.entity";
import { Vehicle } from "../vehicles/vehicles.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn} from "typeorm";

@Entity("drivers")
export class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    position: string;

    @ManyToOne(type => Client, client => client.drivers)
    client: Client;

    @OneToOne(type => Vehicle, vehicle => vehicle.driver)
    @JoinColumn()
    vehicle: Vehicle;

}