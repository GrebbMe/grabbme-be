import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost', // 'user-service'
            port: Number(process.env.USER_PORT),
          },
        });
      },
    },
  ],
})
export class UsersModule {}
