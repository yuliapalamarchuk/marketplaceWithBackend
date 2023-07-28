import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/catalog (GET)', () => {
    return request(app.getHttpServer()).get('/catalog').expect(200).expect([]);
  });

  it('/catalog/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/catalog/1')
      .expect(200)
      .expect('');
  });

  it('/catalog (POST)', () => {
    return request(app.getHttpServer())
      .post('/catalog')
      .send({ name: 'Новая книга' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        );
      });
  });

  it('/catalog (GET)', () => {
    return request(app.getHttpServer())
      .get('/catalog')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Новая книга',
        }]);
  });

  it('/catalog/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/catalog/1')
      .expect(200)
      .expect({
          id: 1,
          name: 'Новая книга',
        });
  });
  
  it('/catalog/1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/catalog/1')
      .expect(200)
  });

  it('/catalog (GET)', () => {
    return request(app.getHttpServer())
    .get('/catalog')
    .expect(200)
    .expect([])
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
