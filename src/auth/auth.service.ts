import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AdminService } from '../admin/admin.service';
import { ConfigInterface } from '../config/config.interface';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService<ConfigInterface>,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    try {
      const { username, password } = loginDto;
      const admin = await this.adminService.getAdminByUsername(username);

      if (!admin) throw new BadRequestException('Invalid username');

      if (!compareSync(password, admin.hashedPassword))
        throw new BadRequestException('Password not match');

      return sign({ username }, this.configService.get('JWT_SECRET'), {
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      });
    } catch (e) {
      console.log(e.message);
      throw new BadRequestException('Invalid username or password');
    }
  }
}
