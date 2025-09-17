import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.services';

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
  
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UserService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
      });
    }
  
    async validate(payload: JwtPayload) {
      const user = await this.usersService.getOne(parseInt(payload.sub));
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    }
}