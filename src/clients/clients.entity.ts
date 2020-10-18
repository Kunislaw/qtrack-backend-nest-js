import { Device } from "../devices/devices.entity";
import { User } from "../users/users.entity";
import { Driver } from "../drivers/drivers.entity";
import { Vehicle } from "../vehicles/vehicles.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity("clients")
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    clientName: string;

    @Column()
    clientAddress: string;

    @Column()
    isCompany: boolean;

    @OneToMany(type => User, user => user.client)
    users: User[];

    @OneToMany(type => Device, device => device.client)
    devices: Device[];

    @OneToMany(type => Driver, driver => driver.client)
    drivers: Driver[];

    @OneToMany(type => Vehicle, vehicle => vehicle.client)
    vehicles: Vehicle[];

}