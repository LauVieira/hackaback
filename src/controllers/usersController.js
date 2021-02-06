const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
//const User = require('../models/User');
//const Session = require('../models/Session');
const { NotFoundError, WrongPasswordError } = require('../errors');

class UsersController {
  async create({
    name, password, email, role
  }) {
    password = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name, email, password, role
    }, { returning: true, raw: true });
    delete user.dataValues.password;
    return user;
  }

  findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async createSession(email, password) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundError('User not found');

    const passwordComparison = bcrypt.compareSync(password, user.password);
    if (!passwordComparison) {
      throw new WrongPasswordError('Password is incorrect');
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    await Session.create({ userId: user.id, token });

    return {
      userId: user.id,
      name: user.name,
      token,
    };
  }

  async createUserData({
    id, description, level, linkedin, topic, photo, website,
  }) {
    const user = User.findOne({ where: { id } });
    if (!user) throw new NotFoundError('User not found');

    const inviteCode = uuid();

    const userData = await UserData.create({
      description, userId: user.id, level, linkedin, topic, photo, website, inviteCode
    });

    return userData;
  }

  async userSignOut(userId) {
    await Session.destroy({ where: { userId } });
  }
}

module.exports = new UsersController();
