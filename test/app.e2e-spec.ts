import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SessionRedisModule } from '../src/session-redis.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SessionRedisModule.forRoot({
        redisOpt: { host: 'localhost', port: 6379 },
        sessionOpt: { secret: 'secret' },
        prefix: 'sess:',
        header: 'Set-Cookie'
      })],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    return app.close()
  })

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/test')
      .expect(200);

    console.log(response.headers['set-cookie'][0])

    await request(app.getHttpServer())
    .get('/test')
    .set('Set-Cookie', response.headers['set-cookie'][0])
    .expect(200)
  });
});
