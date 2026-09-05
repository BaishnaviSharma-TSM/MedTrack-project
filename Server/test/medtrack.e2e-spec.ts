const runE2E = process.env.E2E_DB === 'true';

describe('MedTrack API (e2e)', () => {
  if (!runE2E) {
    it('skips integration suite unless E2E_DB=true with PostgreSQL medtrack database', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let app: import('@nestjs/common').INestApplication;
  let request: typeof import('supertest');

  beforeAll(async () => {
    const { INestApplication, ValidationPipe } = await import('@nestjs/common');
    const { Test } = await import('@nestjs/testing');
    request = (await import('supertest')).default;

    const { AppModule } = await import('../src/app.module');
    const { HttpExceptionFilter } = await import(
      '../src/common/filters/http-exception.filter'
    );
    const { TransformInterceptor } = await import(
      '../src/common/interceptors/transform.interceptor'
    );

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('GET /health returns success envelope', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.status).toBe('ok');
      });
  });

  it('POST /auth/login returns JWT for seed doctor', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'doctor@medtrack.com', password: 'MedTrack@123' })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.accessToken).toBeDefined();
        expect(res.body.data.user.role).toBe('doctor');
      });
  });

  it('POST /visits rejects vitals validation errors with field keys', async () => {
    const login = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'doctor@medtrack.com', password: 'MedTrack@123' });

    const token = login.body.data.accessToken;

    return request(app.getHttpServer())
      .post('/api/v1/visits')
      .set('Authorization', `Bearer ${token}`)
      .send({
        patientId: '00000000-0000-0000-0000-000000000000',
        condition: 'fever',
        vitals: [],
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(Array.isArray(res.body.errors)).toBe(true);
      });
  });
});
