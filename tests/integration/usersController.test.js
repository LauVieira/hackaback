require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Pool } = require('pg');
const supertest = require('supertest');
const { createUser } = require('../feedDatabase');
const app = require('../../src/app');
const { describe } = require('../../src/schemas/signInSchema');

const agent = supertest(app);
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const id = 1991;
const token = jwt.sign({ id }, process.env.SECRET);

jest.mock('jsonwebtoken', () => ({
  sign: () => 'token',
}));

jest.mock('bcrypt', () => ({
  compareSync: (password, hashPassword) => password === hashPassword,
  hashSync: () => 'password',
}));

jest.mock('uuid', () => jest.fn(() => '1'));

beforeAll(async () => {
  await db.query('DELETE FROM users;');
  await db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
});

afterAll(async () => {
  await db.end();
});

describe('POST user/sign-up', () => {
  it('createUser - Should return an object with created User.', async () => {
    const body = {
      name: 'Pedrão Barros',
      email: 'barrospedrao@gmail.com',
      password: 'password',
      passwordConfirmation: 'password',
      role: 'mentored'
    };

    const response = await agent
      .post('/user/sign-up')
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Pedrão Barros',
        email: 'barrospedrao@gmail.com',
        password: 'password',
        role: 'mentored'
      }),
    );
  });
});

describe('POST user/sign-in', () => {
  it('createSession - Should return an object with created userSession.', async () => {
    const body = {
      'email': 'barrospedrao@gmail.com',
      'password': 'password',
    };

    const response = await agent
      .post('/user/sign-in')
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Pedrão Barros',
        email: 'barrospedrao@gmail.com',
        password: 'password',
        role: 'mentored'
      }),
    );
  });
});

describe('POST user/profile', () => {
  it('createUserData - ', async () => {
    await createUser(db, 'Paola', 'paola@paola.com', 'password', 'mentored');
    const body = {
      'userId': 1,
      'description': 'Eu sou a Paola',
      'level': 'Senior',
      'linkedin': 'http://www.linkedin.com/paola',
      'topic': 'backend',
      'photo': 'https://i.imgur.com/BbESsgh.png',
      'website': 'http://www.linkedin.com/paola'
    };

    const response = await agent
      .post('/user/profile')
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        'id': 1,
        'userId': 1,
        'description': 'Eu sou a Paola',
        'level': 'Senior',
        'linkedin': 'http://www.linkedin.com/paola',
        'topic': 'backend',
        'photo': 'https://i.imgur.com/BbESsgh.png',
        'website': 'http://www.linkedin.com/paola',
        'inviteCode': '1'
      }),
    );
  });
});

