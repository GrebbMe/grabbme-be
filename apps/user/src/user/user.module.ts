import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TempUser } from './entities/temp-user.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CareerCategory, PositionCategory, ProjectCategory, TempUser]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.USER_PORT),
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, LoggingInterceptor, Logger],
  exports: [UserService],
})
export class UserModule {}
