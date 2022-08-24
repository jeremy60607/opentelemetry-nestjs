import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRedisService } from "./redis/user-redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRedisService]
})
export class UserModule {}
