const request = require('supertest');
const app = require('../index');
const db = require('../models');

describe('Secretaria API', () => {
  // Sync database before all tests
  beforeAll(async () => {
    await db.sequelize.sync({ force: true }); // Use force: true to reset db for tests
  });

  // Clean up after each test
  afterEach(async () => {
    await db.Secretaria.destroy({ where: {} });
  });

  // Close db connection after all tests
  afterAll(async () => {
    await db.sequelize.close();
  });

  // Test for POST /api/secretarias
  describe('POST /api/secretarias', () => {
    it('should create a new secretaria and return 201', async () => {
      const res = await request(app)
        .post('/api/secretarias')
        .send({ name: 'Secretaria de Teste' });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Secretaria de Teste');
    });

    it('should return 400 for missing name', async () => {
      const res = await request(app)
        .post('/api/secretarias')
        .send({});
      expect(res.statusCode).toEqual(400);
    });
  });

  // Test for GET /api/secretarias
  describe('GET /api/secretarias', () => {
    it('should return an array of secretarias', async () => {
      await db.Secretaria.create({ name: 'Secretaria 1' });
      await db.Secretaria.create({ name: 'Secretaria 2' });

      const res = await request(app).get('/api/secretarias');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(2);
    });
  });

  // Test for GET /api/secretarias/:id
  describe('GET /api/secretarias/:id', () => {
    it('should return a single secretaria', async () => {
      const secretaria = await db.Secretaria.create({ name: 'Secretaria Unica' });
      const res = await request(app).get(`/api/secretarias/${secretaria.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('Secretaria Unica');
    });

    it('should return 404 for non-existent id', async () => {
      const res = await request(app).get('/api/secretarias/999');
      expect(res.statusCode).toEqual(404);
    });
  });

  // Test for PUT /api/secretarias/:id
  describe('PUT /api/secretarias/:id', () => {
    it('should update a secretaria', async () => {
      const secretaria = await db.Secretaria.create({ name: 'Nome Antigo' });
      const res = await request(app)
        .put(`/api/secretarias/${secretaria.id}`)
        .send({ name: 'Nome Novo' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('Nome Novo');
    });
  });

  // Test for DELETE /api/secretarias/:id
  describe('DELETE /api/secretarias/:id', () => {
    it('should delete a secretaria', async () => {
      const secretaria = await db.Secretaria.create({ name: 'Para Deletar' });
      const res = await request(app).delete(`/api/secretarias/${secretaria.id}`);

      expect(res.statusCode).toEqual(204);

      const found = await db.Secretaria.findByPk(secretaria.id);
      expect(found).toBeNull();
    });
  });
});
