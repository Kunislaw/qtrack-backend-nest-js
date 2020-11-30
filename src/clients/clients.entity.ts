import { Device } from "../devices/devices.entity";
import { User } from "../users/users.entity";
import { Driver } from "../drivers/drivers.entity";
import { Vehicle } from "../vehicles/vehicles.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity("clients")
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    phone: string;

    @Column({nullable: false})
    zipCode: string;

    @Column({nullable: false})
    address: string;

    @Column({nullable: false})
    country: string;

    @Column({nullable: true})
    firstName: string;
    
    @Column({nullable: true})
    lastName: string;

    @Column({nullable: false})
    isCompany: boolean;

    @Column({nullable: true})
    companyName: string;

    @Column({nullable: true})
    companyTaxIdentifier: string;

    @OneToMany(type => User, user => user.client)
    users: User[];

    @OneToMany(type => Device, device => device.client)
    devices: Device[];

    @OneToMany(type => Driver, driver => driver.client)
    drivers: Driver[];

    @OneToMany(type => Vehicle, vehicle => vehicle.client)
    vehicles: Vehicle[];

}