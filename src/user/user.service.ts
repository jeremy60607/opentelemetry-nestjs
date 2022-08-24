import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserRedisService } from "./redis/user-redis.service";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userRedisService: UserRedisService
  ) {}

  async create() {
    await this.usersRepository.save({
      firstName: '123',
      lastName: '345'
    })
    await this.userRedisService.setRedis()
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findCache(): Promise<string> {
    return await this.userRedisService.findRedis();
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
