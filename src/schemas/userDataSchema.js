const joi = require('joi');

module.exports = joi.object({
  description: joi.string().required(),
  level: joi.string().required(),
  linkedin: joi.string().uri().required(),
  topic: joi.string().required(),
  photo: joi.string().uri().required(),
  website: joi.string().uri().required(),

});
