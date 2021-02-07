const Career = require('../models/Career');
const CareerUser = require('../models/CareerUser');
const Session = require('../models/Session');
const User = require('../models/User');
const UserData = require('../models/UserData');

User.belongsToMany(Career, { through: CareerUser });
Career.belongsToMany(User, { through: CareerUser });

User.hasMany(UserData);
User.hasMany(Session);
