import { Client } from "../clients/clients.entity";
import { Position } from "../positions/positions.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Vehicle } from "src/vehicles/vehicles.entity";

@Entity("devices")
export class Device {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    ownName: string;

    @ManyToOne(type => Client, client => client.devices)
    client: Client;

    @OneToMany(type => Position, position => position.device)
    positions: Position[];

    @OneToOne(type => Vehicle, vehicle => vehicle.device)
    @JoinColumn()
    vehicle: Vehicle;
}