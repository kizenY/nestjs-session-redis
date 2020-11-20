import { RedisStoreOptions } from "connect-redis";
import { SessionOptions } from "express-session";

export interface SessionRedisOpt{
    redisOpt: RedisStoreOptions,

    sessionOpt: SessionOptions,

    header: string;
}