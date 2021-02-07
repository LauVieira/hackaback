const Career = require('../models/Career');
const CareerUser = require('../models/CareerUser');
const Session = require('../models/Session');
const User = require('../models/User');
const UserData = require('../models/UserData');

User.belongsToMany(Career, { through: CareerUser });
User.hasMany(CareerUser);
User.hasMany(Session);
User.hasOne(UserData);

Career.belongsTo(User, { through: CareerUser });
CareerUser.belongsTo(User);
CareerUser.belongsTo(Career);

UserData.belongsTo(User);

