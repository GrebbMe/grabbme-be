import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
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
export class UserModule {}
