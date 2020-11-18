import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SessionOptions } from 'express-session';
import { ClientOpts } from 'redis';
import { SessionMiddleware } from './app.middleware';
import { TestController } from './test.controller';

// export declare type SessionRedisOpt = { prefix: string, header: string }
export class SessionRedisOpt {
  redisOpt: ClientOpts;
  sessionOpt: SessionOptions;
  prefix: string;
  header: string;
}
export const SessionRedisOption = 'SESSION_REDIS_OPT'
@Module({
  imports: [],
  providers: [
    SessionMiddleware,
    {
      provide: SessionRedisOpt,
      useValue: {}
    }
  ],
  controllers: [TestController],
})
export class SessionRedisModule implements NestModule {
  configure(comsumer: MiddlewareConsumer) {
    return comsumer
      .apply(SessionMiddleware)
      .forRoutes('*')
  }
  static forRoot(opt: SessionRedisOpt): DynamicModule {
    return {
      module: SessionRedisModule,
      providers: [
        {
          provide: 'SESSION_REDIS_OPT',
          useValue: opt
        },
      ]
    }
  }
}
