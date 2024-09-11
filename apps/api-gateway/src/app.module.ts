import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import mongoConfig from './config/mongo.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './users/user.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig, mongoConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const gatewayOrmOptions: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          database: configService.get('mysql.database'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          synchronize:
            configService.get<string>('NODE_ENV') === 'development'
              ? true
              : false,
          autoLoadEntities: true,
          entities: [`${__dirname}/**/*.entity.{js,ts}`],
          logging: true,
        };
        return gatewayOrmOptions;
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const gatewayMongooseOptions: MongooseModuleOptions = {
          uri: `${configService.get('mongo.host')}:${configService.get('mongo.port')}`,
          auth: {
            username: configService.get('mongo.username'),
            password: configService.get('mongo.password'),
          },
        };
        return gatewayMongooseOptions;
      },
    }),
    UserModule,
    BoardModule,
  ],
  providers: [Logger],
})

// Setting For Logs
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
