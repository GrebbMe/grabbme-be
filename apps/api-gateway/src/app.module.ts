import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { PublicDataModule } from './public-data/public-data.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import mongoConfig from './config/mongo.config';
import mysqlConfig from './config/mysql.config';

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
          synchronize: process.env.NODE_ENV === 'development',
          autoLoadEntities: true,
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
    PublicDataModule,
  ],

  providers: [Logger],
})

// Setting For Logs
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
