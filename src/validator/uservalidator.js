const { checkSchema } = require('express-validator');

module.exports = {
    editAction: checkSchema({

        token: {
            notEmpty: true
        },

        name: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome precisa de pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email invalido'
        },
        password: {
            isLength: {
                options: { min: 4 }
            },
            errorMessage: 'Senha precisa de pelo menos 4 caracteres'
        }
    })
};