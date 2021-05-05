import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../modules/auth/local.strategy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import config from '../../config/keys';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../../modules/items/items.module';
import { AuthModule } from '../../modules/auth/auth.module';
import { UsersModule } from '../../modules/users/users.module';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [
    ItemsModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: config.secret,
      signOptions: { expiresIn: '2d' },
    }),
    MongooseModule.forRoot(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpErrorFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: ObjectIdErrorFilter,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('items');
  }
}
