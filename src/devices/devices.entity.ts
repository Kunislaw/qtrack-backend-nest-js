import { Client } from "../clients/clients.entity";
import { Position } from "../positions/positions.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";

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
}