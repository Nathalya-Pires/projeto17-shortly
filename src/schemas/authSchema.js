import joi from "joi";

const authSchema = joi.object({
  email: joi.string().email().required().min(5),
  password: joi.string().required().min(5),
});

export default authSchema;