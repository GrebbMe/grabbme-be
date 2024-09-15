import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import mysqlConfig from './config/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const userTypeOrmModuleOptions: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          database: configService.get('mysql.database'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          autoLoadEntities: true,
          logging: true,
          entities: [`${__dirname}/**/*.entity.{ts,js}`],
          synchronize: process.env.NODE_ENV === 'development',
        };
        return userTypeOrmModuleOptions;
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
