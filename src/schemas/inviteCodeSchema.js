const joi = require('joi');

module.exports = joi.object({
  inviteCode: joi.string().required(),
});
