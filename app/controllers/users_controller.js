const express = require('express')
const router = express.Router()
const { User} = require('../models/user') 
const {authenticateUser}=require('../middleware/authenticate')

// post localhost:3000/users/register
router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    console.log(user)
    // instance methods are called on objects
    user.save()
        .then((user) => {
            res.send({
                user,
                notice: 'successfully registered'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})

// login user
router.post('/login', (req, res) => {

    const body = req.body
    // static method is called on the model / class
    User.findByEmailAndPassword(body.email, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
         //   res.header('x-auth', token).send()
            res.send({ token })
        })
        .catch((err) => {
            res.send(err)
        })
})


router.delete('/logout', authenticateUser, (req, res) => {
    User.findOne({
            _id: req.user._id
        })
        .then((user) => {
            // res.send(user)
            console.log(user.tokens);
            console.log(req.token);
            user.tokens = user.tokens.filter(tokenItem => tokenItem.token != req.token)
            user.save()
                .then((user) => {
                    res.send({
                        user,
                        notice: "successfully logged out"
                    })
                })
                .catch(err => res.send(err))
        })

        .catch((err) => {
            res.send(err) 
        })
})
router.delete('/logoutall', authenticateUser, (req, res) => {
    User.findOne({
            _id: req.user._id
        })
        .then((user) => {
            // console.log(user.tokens)
            user.tokens = [] //user.tokens.splice(0)
            user.save()
                .then((user) => {
                    res.send({
                        user,
                        notice: "successfully logged out"
                    })
                })
                .catch(err => res.send(err))
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = {
    usersRouter: router
}