import joi from 'joi';

export const signUpValidation = async (req, res, next) => {
  const passwordComplexity =
    /^(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?\/>.<,])(?=.*[A-Z])/;
  const userSchema = joi
    .object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .pattern(passwordComplexity)
        .required()
        .messages({
          'string.pattern.base':
            'Password must contain at least one number, one special character, and one uppercase letter',
        }),
      name: joi.string().required(),
    })
    .options({ allowUnknown: true });

  const value = await userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ''),
    });
  } else {
    next();
  }
};
export const loginValidation = async (req, res, next) => {
  const userSchema = joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    })
    .options({ allowUnknown: true });

  const value = await userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ''),
    });
  } else {
    next();
  }
};
export const forgotPasswordValidation = async (req, res, next) => {
  const userSchema = joi
    .object({
      email: joi.string().email().required(),
    })
    .options({ allowUnknown: true });

  const value = await userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ''),
    });
  } else {
    next();
  }
};
export const resetPasswordValidation = async (req, res, next) => {
  const passwordComplexity =
    /^(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?\/>.<,])(?=.*[A-Z])/;
  const userSchema = joi
    .object({
      password: joi
        .string()
        .min(8)
        .pattern(passwordComplexity)
        .required()
        .messages({
          'string.pattern.base':
            'Password must contain at least one number, one special character, and one uppercase letter',
        }),
    })
    .options({ allowUnknown: true });

  const value = await userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ''),
    });
  } else {
    next();
  }
};
export const verifyOTpValidation = async (req, res, next) => {
  const userSchema = joi
    .object({
      email: joi.string().email().required(),
    })
    .options({ allowUnknown: true });

  const value = await userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ''),
    });
  } else {
    next();
  }
};
