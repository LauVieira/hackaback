const joi = require('joi');

module.exports = joi.object({
  userId: joi.number().required(),
  description: joi.string().required(),
  level: joi.string().required(),
  linkedin: joi.string().uri().required(),
  topics: joi.string().required(),
  photo: joi.string().uri().required(),
  website: joi.string().uri().required(),
  contactEmail: joi.string().email().required(),

});
