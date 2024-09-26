import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { PublicDataModule } from './public-data/public-data.module';
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
        const publicDataTypeOrmModuleOptions: TypeOrmModuleOptions = {
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
        return publicDataTypeOrmModuleOptions;
      },
      dataSourceFactory: async (option: DataSourceOptions) => {
        if (!option) throw new Error('Invalid Option Passes');
        const dataSource = new DataSource(option);
        return addTransactionalDataSource(dataSource);
      },
    }),

    PublicDataModule,
  ],
})
export class AppModule {}
