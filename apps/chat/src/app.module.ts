import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
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
        const chatTypeOrmModuleOptions: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          database: configService.get('mysql.database'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          autoLoadEntities: true,
          entities: [`${__dirname}/**/*.entity.{ts,js}`],
          logging: true,
          synchronize: process.env.NODE_ENV === 'development',
        };
        return chatTypeOrmModuleOptions;
      },
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const chatMongooseOptions: MongooseModuleOptions = {
          uri: configService.get('mongo.uri'),
          auth: {
            username: configService.get('mongo.username'),
            password: configService.get('mongo.password'),
          },
        };
        return chatMongooseOptions;
      },
    }),

    ChatModule,
  ],
})
export class AppModule {}
