import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { EventsModule } from './events/events.module';
import { User } from './users/user.entity';
import { Event } from './events/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User, Event],
      logging: true,
    }),
    AuthModule,
    UserModule,
    EventsModule,
  ],
})
export class AppModule {}
