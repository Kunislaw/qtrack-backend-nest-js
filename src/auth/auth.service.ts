import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        if(user && await bcrypt.compare(pass, user.password)){
            const result = {
                id: user.id,
                email: user.email,
                role: user.role,
                clientId: user.client.id
            };
            return result;
        } else {
            return null;
        }
    }
    async login(user: any){
        const payload = {username: user.email, sub: user.id, clientId: user.clientId, role: user.role};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
    async register(userData: any): Promise<any> {
        return await this.usersService.create(userData);
    }
}