import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import config from './config/keys';
// import { ItemsController } from './items/items.controller';
// import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ItemsModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
    MongooseModule.forRoot(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, LocalStrategy],
})
export class AppModule {}
