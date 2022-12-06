
const path = require('path');
const { check } = require('express-validator');


const validations = [
    check('name')
        .notEmpty().withMessage('É necessário digitar seu nome completo').bail()
        .trim(),
    check('email')
        .notEmpty().withMessage('É necessário digitar um email').bail()
        .isEmail().withMessage('Esse não é um email válido'),
    check('password')
        .notEmpty().withMessage('É necessário digitar uma senha').bail()
        .isLength({min: 6}).withMessage('A senha precisa ter no mínimo 6 caracteres').bail()
        .trim(),
   
]
module.exports = validations;