import { Inject, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { SessionRedisOpt } from "./session-redis.module";
import * as getRedisStore from 'connect-redis'
import * as session from 'express-session';
import * as redis from 'redis';

const RedisStore = getRedisStore(session);
export class SessionMiddleware implements NestMiddleware {
    constructor(
        @Inject('SESSION_REDIS_OPT')
        private readonly sessionRedisOpt: SessionRedisOpt,
    ){
        if(sessionRedisOpt.header) {
            sessionRedisOpt.header = sessionRedisOpt.header.toLocaleLowerCase();
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    use(req: Request, res: Response, next: () => void): void {
        const { header } = this.sessionRedisOpt;
        if(req.headers[header]) req.headers.cookie = req.headers[header][0];
        const { redisOpt } = this.sessionRedisOpt;
        const sessionFunc = session({
            store: new RedisStore({ client: redis.createClient(redisOpt) }),
            ...this.sessionRedisOpt.sessionOpt
        });
        sessionFunc(req, res, next);
    }
}