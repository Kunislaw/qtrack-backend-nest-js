import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '11123123123'
        });
    }

    async validate(payload: any){
        return {userId: payload.sub, username: payload.username, clientId: payload.clientId, role: payload.role};
    }
}