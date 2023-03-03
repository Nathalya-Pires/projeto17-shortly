import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: joi.string().required(),
  confirmPassword: joi.any().equal(joi.ref('password')).required()
});

export default userSchema;
