import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        if(user && bcrypt.compare(pass, user.password)){
            const {password, ...result} = user;
            return result;
        } else {
            return null;
        }
    }
    async login(user: any){
        const payload = {username: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
    async register(userData: any): Promise<any> {
        return await this.usersService.create(userData);
    }
}