import { Client } from "../clients/clients.entity";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(type => Client, client => client.users)
    client: Client;
}