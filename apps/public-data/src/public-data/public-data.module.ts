import { User } from '@apps/user/src/user/entities/user.entity';
import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { PublicDataController } from './public-data.controller';
import { PublicDataService } from './public-data.service';
import {
  PostCategory,
  CareerCategory,
  PositionCategory,
  ProjectCategory,
  StackCategory,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      CareerCategory,
      StackCategory,
      PostCategory,
      PositionCategory,
      ProjectCategory,
    ]),

    ClientsModule.register([
      {
        name: 'PUBLIC_DATA_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.PUBLIC_DATA_PORT),
        },
      },
    ]),
  ],
  exports: [PublicDataService],

  controllers: [PublicDataController],

  providers: [PublicDataService, LoggingInterceptor, Logger],
})
export class PublicDataModule {}
