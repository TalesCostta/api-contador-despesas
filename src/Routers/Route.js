const express = require("express");
const user = require("../models/User");
const Auth = require('../middleware/middleware');
const modelLog = require('../models/log');

const AuthValidator = require('../validator/authvalidator');
const UserValidator = require('../validator/uservalidator');

const AuthController = require('../Routers/controllers/AuthController');
const UserController = require('../Routers/controllers/UserController');

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({
        status: true,
        message: "Funcionando"
    })
})

router.post('/add', async (req, res) => {
    const { title, description, value, mode } = req.body;
    const user = req.email;
    if (!title)
        return res.status(400).send({ status: false, msg: "Falta parametro: titulo'" });

    if (!description)
        return res.status(400).send({ status: false, msg: "Falta parametro: descricao" });

    if (!value)
        return res.status(400).send({ status: false, msg: "Falta parametro: valor" });

    var post = await modelLog.create({
        title,
        description,
        value,
    });

    res.send({ post });
});

router.post('/getone', async (req, res) => {
    var { post } = req.body;

    if (!post)
        return res.status(400).send({ status: false, msg: "You need send the post id" });

    post = await modelLog.findOne({ _id: post });

    if (!post)
        return res.status(400).send({ status: false, msg: "Don't have post with this 'id' " });

    res.send({ post })
});

router.post('/remove', async (req, res) => {
    var { post } = req.body;

    if (!post)
        return res.status(400).send({ status: false, msg: "You need send the post id" });

    const postInfo = await modelLog.findOne({ _id: post })
    if (!postInfo)
        return res.status(400).send({ status: false, msg: "Post not found" });

    postInfo.remove((err, result) => {
        if (err)
            return res.status(400).send({ status: false, msg: "Failed to remove post", result });

        return res.send({ status: true, msg: "Post removed with success" });
    });
});

router.post('/cadastro', AuthValidator.signup, AuthController.signup);



module.exports = router