import { User } from '@apps/user/src/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      PostCategory,
      PositionCategory,
      CareerCategory,
      StackCategory,
      User,
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

  providers: [PublicDataService],
})
export class PublicDataModule {}
