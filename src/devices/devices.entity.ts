import { Client } from "../clients/clients.entity";
import { Position } from "../positions/positions.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";

@Entity("devices")
export class Device {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ownName: string;

    @ManyToOne(type => Client, client => client.devices)
    client: Client;

    @OneToMany(type => Position, position => position.device)
    positions: Position[];
}