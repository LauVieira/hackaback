/* eslint-disable no-undef */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const usersController = require('../../src/controllers/usersController');
const Session = require('../../src/models/Session');
const User = require('../../src/models/User');
const { ConflictError, NotFoundError, AuthError, WrongPasswordError } = require('../../src/errors');

jest.mock('../../src/models/Session');
jest.mock('../../src/models/User');

jest.mock('bcrypt', () => ({
  compareSync: (password, hashPassword) => password === hashPassword,
  hashSync: () => 'password',
}));

const id = 1;
const token = jwt.sign({ id }, process.env.SECRET);

describe('POST user/sign-up', () => {
  it('createUser - Should return a throw error trying to create a user that already exists.', async () => {
    const User = require('../../src/models/User');

    User.findOne.mockResolvedValue({
      'id': 1,
      'name': 'Pedrão Barros',
      'email': 'barrospedrao@gmail.com',
      'password': 'password',
      'role': 'mentored'

    });

    const dataUser = {
      'name': 'Pedrão Barros',
      'email': 'barrospedrao@gmail.com',
      'password': 'password',
      'role': 'mentored'
    };

    async function user() {
      return await usersController.createUser(dataUser);
    }

    expect(user).rejects.toThrow(ConflictError);
  });
});

describe('POST user/sign-in', () => {
  it('createSession - Should return a throw error trying to create a session that user not exists.', async () => {
    const email = 'susdgdsdgiasf@gmail.com';
    const password = '12345';

    const User = require('../../src/models/User');

    User.findOne.mockResolvedValue(null);

    async function session() {
      return await usersController.createSession(email, password);
    }

    expect(session).rejects.toThrow(NotFoundError);
  });
});
