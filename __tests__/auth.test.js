const request = require('supertest');
const app = require('../index');
const db = require('../models');

describe('Auth API', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.User.destroy({ where: {} });
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'master_admin',
    };

    describe('POST /api/auth/register', () => {
        it('should register a new user and return 201', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.email).toBe(testUser.email);
        });

        it('should not allow registering with a duplicate email', async () => {
            await request(app).post('/api/auth/register').send(testUser);
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toContain('email must be unique');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send(testUser);
        });

        it('should login a registered user and return a token', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: testUser.email, password: testUser.password });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should fail with wrong password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: testUser.email, password: 'wrongpassword' });
            expect(res.statusCode).toEqual(401);
        });
    });

    describe('GET /api/users/me (Protected Route)', () => {
        it('should fail without a token', async () => {
            const res = await request(app).get('/api/users/me');
            expect(res.statusCode).toEqual(401);
        });

        it('should succeed with a valid token', async () => {
            // Register and login to get a token
            await request(app).post('/api/auth/register').send(testUser);
            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({ email: testUser.email, password: testUser.password });
            const token = loginRes.body.token;

            // Use the token to access the protected route
            const res = await request(app)
                .get('/api/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toBe(testUser.email);
        });
    });
});
