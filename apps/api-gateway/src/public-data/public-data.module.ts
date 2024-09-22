import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PublicDataController } from './public-data.controller';
import { PublicDataService } from './public-data.service';

@Module({
  exports: [PublicDataService],
  controllers: [PublicDataController],
  providers: [
    PublicDataService,

    {
      provide: 'PUBLIC_DATA_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: Number(process.env.PUBLIC_DATA_PORT),
          },
        });
      },
    },
  ],
})
export class PublicDataModule {}
