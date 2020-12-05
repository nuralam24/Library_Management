// Validation

const Joi = require('@hapi/joi');

const registrationValidation = Joi.object({ 
    userType: Joi.string().min(1).required(),   
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
});

const loginValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
});

const libraryValidation = Joi.object({
    bookName: Joi.string().min(2).required(),
    author: Joi.string().min(2).required()
});

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};


module.exports = {
    registrationValidation,
    loginValidation,
    libraryValidation,
    options
};









// const registrationValidation = data => {
//     const schema = {
//         userType: Joi.string().min(1).required(),   
//         name: Joi.string().min(2).required(),
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(5).required()
//     }
//     return Joi.validate(data, schema);
// };

// const loginValidation = data => {
//     const schema = {
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(5).required()
//     }
//     return Joi.validate(data, schema);
// };


// // module.exports.registrationValidation = registrationValidation;
// // module.exports.loginValidation = loginValidation;
// module.exports = {
//     registrationValidation,
//     loginValidation,
// };