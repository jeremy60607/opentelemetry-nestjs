import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'opentelemetry-nestjs',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      trace: true
    }),
    RedisModule.forRoot({
      config: {
        url: 'redis://localhost:6379?password=password'
        // username: 'root',
        // host: 'localhost',
        // port: 6379,
        // password: 'passowrd'
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
