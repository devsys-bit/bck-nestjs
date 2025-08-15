import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      //type: 'mysql',
      type: 'postgres',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),  
    TaskModule
  ],
})
export class AppModule {}
