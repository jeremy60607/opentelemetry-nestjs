import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import * as IORedis from 'ioredis';

@Injectable()
export class UserRedisService {
  private readonly redis: IORedis.Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async findRedis(){
    return await this.redis.get(
      'set-user'
    );
  }

  async setRedis(){
    await this.redis.set(
      'set-user','345'
    );
  }
}
