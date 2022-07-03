const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../../models/User');

module.exports = {
    signin: async(req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);

        //verificar no banco email correspondente
        const user = await User.findOne({ email: data.email });
        if (!user) {
            res.json({ error: 'Email e/ou senha nao correspondentes' });
            return;
        }
        //validar senha correspondente
        const match = await bcrypt.compare(data.password, user.passwordHash);
        if (!match) {
            res.json({ error: 'Email e/ou senha nao correspondentes' });
            return;
        }
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.json({ token, email: data.email });

    },
    signup: async(req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.json({
                error: erros.mapped()
            });
            return;
        }

        const data = matchedData(req);
        const user = await User.findOne({
            email: data.email
        });

        if (user) {
            res.json({
                error: { email: { msg: 'Ja tem esse email cadastrado' } }
            });
            return;
        }

        if (mongoose.Types.ObjectId.isValid(data.state)) {
            const stateItem = await State.findById(data.state);
            if (!stateItem) {
                res.json({
                    error: { state: { msg: 'Este estado nao existe' } }
                });
                return;
            }
        } else {
            res.json({
                error: { state: { msg: 'Codigo de estado nao existe' } }
            });
            return;
        }
        //Gravar no banco 
        const passwordHash = await bcrypt.hash(data.password, 10);
        //hash aleatorio
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        });

        await newUser.save();


        res.json({ token });


    },
    editAction: async(req, res) => {

    }


};