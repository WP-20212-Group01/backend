import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { ConfigInterface } from '../config/config.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService<ConfigInterface>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authHeader = request.headers.authorization;
    if (!authHeader?.length) return false;

    const [type, token] = authHeader.split(' ');
    if (type.toLowerCase() !== 'bearer') return false;

    const parsedToken = verify(token, this.configService.get('JWT_SECRET'));

    return (parsedToken as JwtPayload)?.username?.length > 0;
  }
}
