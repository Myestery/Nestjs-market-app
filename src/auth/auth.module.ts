import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import config from '../config/keys';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
