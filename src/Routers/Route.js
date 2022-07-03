const express = require("express");
const user = require("../models/User");
const Auth = require('../middleware/middleware');
const modelLog = require('../models/log');

const AuthValidator = require('../validator/authvalidator');
const UserValidator = require('../validator/uservalidator');

const AuthController = require('../Routers/controllers/AuthController');
const UserController = require('../Routers/controllers/UserController');

const router = express.Router();

router.get("/", async(req, res) =>{
    res.json({
        status: true,
        message: "Funcionando"
    })
})

router.post('/add', async ( req, res ) =>{
    const { title, description, value, mode } = req.body;
    const user = req.userId;
    if(!title)
        return res.status(400).send({ status: false, msg: "Need parameter 'title'"});
    
    if(!description)
        return res.status(400).send({ status: false, msg: "Need parameter 'description'"});
    
    if(!value)
        return res.status(400).send({ status: false, msg: "Need parameter 'value'" });

    if(mode === '')
        return res.status(400).send({ status: false, msg: "Need parameter 'mode'" })
    
    const userInfo = await user.findOne({ _id: user }, (err, userfind) => {
        if(err)
            return res.status(400).send({ status: false, msg: "Error to request" });    
        userfind.save(async (err) => {
            if(err)
                return res.status(400).send({ status: false, msg: "Error to request 2" });
            try{
                var post = await modelLog.create({
                    title,
                    description,
                    value,
                    user,
                    mode
                });
        
                res.send({ user: userfind, post });
            }catch(err){
                res.send({status: false, msg:"Post error"});
            }
        });
    });
});

router.get('/getall', async ( req, res ) =>{
    const id = req.userId;
    const posts = await modelLog.find({user: id});

    res.send({ posts })
});

router.post('/getone', async ( req, res ) =>{
    var { post } = req.body;

    if(!post)
        return res.status(400).send({ status: false, msg: "You need send the post id" });

    post = await modelLog.findOne({ _id: post });

    if(!post)
        return res.status(400).send({ status: false, msg:"Don't have post with this 'id' " });

    res.send({ post })
});

router.post('/remove', async ( req, res ) =>{
    var { post } = req.body;

    if(!post)
        return res.status(400).send({ status: false, msg: "You need send the post id" });

    const postInfo = await modelLog.findOne({ _id: post })
    if(!postInfo)
        return res.status(400).send({ status: false, msg: "Post not found" });
    
    postInfo.remove((err, result) => {
        if(err)
            return res.status(400).send({ status: false, msg: "Failed to remove post" , result});
    
        return res.send({status: true, msg: "Post removed with success"});
    });
});

router.post('/cadastro', AuthValidator.signin, AuthController.signin);



module.exports = router