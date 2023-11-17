const Joi = require('joi');

exports.signupValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().min(6).required()
    }).options({ abortEarly: false });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            error: error.details
        });
    }

    next();
};

exports.loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }).options({ abortEarly: false });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            error: error.details
        });
    }
    next();
};

