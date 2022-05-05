const Handler = require('../../../utils/resHandler')
const joi = require("joi");




exports.create = (req, res, next) => {
  const schema = joi.object({
  title:joi.string(),
  description:joi.string(),
  img:joi.string(),
  categorious:joi.array().items(),
  size:joi.array(),
  color:joi.array(),
  price:joi.number()
  });
  const { error, value } = schema.validate(req.body);

  if (error) next(new Error(error.details[0].message));
  else next();
};
