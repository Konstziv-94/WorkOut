const Joi = require('joi');

module.exports.userSchema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(5),
    username: Joi.string().alphanum().required().min(4),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    sex: Joi.string().required(),
    age: Joi.number().required().min(16).max(80),
});