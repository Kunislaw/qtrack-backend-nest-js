import { Device } from "../devices/devices.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne} from "typeorm";

@Entity("positions")
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    altitude: number;

    @Column()
    speed: number;

    @Column()
    utcTimestamp: number;

    @ManyToOne(type => Device, device => device.positions)
    device: Device;

}