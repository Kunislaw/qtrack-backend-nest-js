import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './localstrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({secret: '11123123123', signOptions: {expiresIn: '300s'}})],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
