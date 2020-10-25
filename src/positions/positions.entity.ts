import { Device } from "../devices/devices.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne} from "typeorm";

@Entity("positions")
export class Position {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("float")
    latitude: number;

    @Column("float")
    longitude: number;

    @Column("float")
    altitude: number;

    @Column("float")
    speed: number;

    @Column()
    utcTimestamp: number;

    @ManyToOne(type => Device, device => device.positions)
    device: Device;

}