const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const UserData = require('../models/UserData');
const Session = require('../models/Session');
const CareerUser = require('../models/CareerUser');
const Career = require('../models/Career');
const { NotFoundError, WrongPasswordError } = require('../errors');

class UsersController {
  async createUser({
    name, password, email, role
  }) {
    password = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name, email, password, role
    });
    return user;
  }

  findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async createSession(email, password) {
    const DbUser = await this.findByEmail(email);
    if (!DbUser) throw new NotFoundError('User not found');

    const passwordComparison = bcrypt.compareSync(password, DbUser.password);

    if (!passwordComparison) {
      throw new WrongPasswordError('Password is incorrect');
    }

    const token = jwt.sign({ id: DbUser.id }, process.env.SECRET);
    await Session.create({ userId: DbUser.id, token });

    const user = {
      id: DbUser.id,
      name: DbUser.name,
      email: DbUser.email,
      role: DbUser.role
    };

    return {
      user,
      token
    };
  }

  async findUserData(userId) {
    return UserData.findOne({ where: { userId } });
  }

  async createUserData({ data, title }) {
    const { userId, description, level, linkedin, topics, photo, website, contactEmail } = data;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundError('User not found');
    const inviteCode = uuidv4();

    const career = await Career.findOne({ where: { title } });
    const { id } = career;

    await CareerUser.create({ careerId: id, userId });

    const userData = await UserData.create({
      description, userId, level, linkedin, topics, photo, website, inviteCode, contactEmail
    });

    return userData;
  }

  async userSignOut(userId) {
    await Session.destroy({ where: { userId } });
  }
}

module.exports = new UsersController();
