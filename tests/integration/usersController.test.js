require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Pool } = require('pg');
const supertest = require('supertest');
const sequelize = require('../../src/utils/database');
const app = require('../../src/app');

const agent = supertest(app);
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const { createUserDb } = require('../feedDatabase');

const id = 1991;
const token = jwt.sign({ id }, process.env.SECRET);

jest.mock('jsonwebtoken', () => ({
  sign: () => 'token',
}));

jest.mock('bcrypt', () => ({
  compareSync: (password, hashPassword) => password === hashPassword,
  hashSync: () => 'password',
}));

beforeAll(async () => {
  await db.query('DELETE FROM "userData"');
  await db.query('DELETE FROM sessions');
  await db.query('DELETE FROM users');
  await db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
  await db.query('ALTER SEQUENCE sessions_id_seq RESTART WITH 1;');
});

afterAll(async () => {
  await db.end();
  await sequelize.close();
});

describe('POST user/sign-up', () => {
  it('createUser - Should return a object with created user.', async () => {
    const body = {
      email: 'ninadahora@gmail.com',
      password: '12345',
      passwordConfirmation: '12345',
      name: 'Nina da Hora',
      role: 'mentored'
    };

    const response = await agent
      .post('/user/sign-up')
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Nina da Hora',
        email: 'ninadahora@gmail.com',
        password: expect.any(String),
        role: 'mentored'
      }),
    );
  });
});

describe('POST user/sign-in', () => {
  it('createSession - Should return an object with created userSession.', async () => {
    await createUserDb(db, 'Paola', 'paola@paola.com', '12345', 'mentored');
    const body = {
      email: 'paola@paola.com',
      password: '12345',
    };

    const response = await agent
      .post('/user/sign-in')
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        token: 'token'

      }),
    );
  });
});

describe('POST user/profile', () => {
  it('createUserData - Should return an object with created user profile.', async () => {
    await createUserDb(db, 'Laura Gurgel', 'laura@imail.com', '12345', 'mentored');

    const bodySignIn = {
      email: 'laura@imail.com',
      password: '12345',
    };

    const signIn = await agent
      .post('/user/sign-in')
      .send(bodySignIn);

    const body = {
      userId: 3,
      description: 'Rainha do Pitch',
      level: 'Sênior',
      linkedin: 'http://www.linkedin.com/laura',
      topics: 'Produto',
      photo: 'https://i.imgur.com/BbESsgh.png',
      website: 'http://www.linkedin.com/laura',
      contactEmail: 'contatolaura@gmail.com'
    };

    const response = await agent
      .post('user/profile')
      .set('Authorization', `Bearer ${signIn.token}`)
      .send(body);

    console.log(response);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        description: 'Eu sou a Paola',
        level: 'Senior',
        linkedin: 'http://www.linkedin.com/paola',
        topic: 'backend',
        photo: 'https://i.imgur.com/BbESsgh.png',
        website: 'http://www.linkedin.com/paola',
        inviteCode: expect.any(String),
        contactEmail: 'barroso@gmail.com',
      }),
    );
  });
});

