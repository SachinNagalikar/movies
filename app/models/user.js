const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
//object consize property.es6 
const { 
    Schema
} = mongoose
 //const Scheme=mongoose.Scheme es5

const userSchema = new Schema({
    username: { 
        type: String,
        minlength: 3, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email format'
            }
        }
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 128
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String
        }
    }]

})


userSchema.pre('save', function (next) {
    if (this.isNew) {
        console.log(this)
        bcryptjs.genSalt(10).then((salt) => {
            bcryptjs.hash(this.password, salt).then((hashedPassword) => {
                this.password = hashedPassword
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.statics.findByEmailAndPassword = function (email, password) {
    const User = this
    return User.findOne({
            email
        })
        .then((user) => {
            if (user) {
                return bcryptjs.compare(password, user.password).then((result) => {
                    if (result) {
                        return Promise.resolve(user)

                    } else {
                        return Promise.reject('invalid password or email')
                    }
                })
            } else {
                return Promise.reject('invalid email or password')
            }
        })
        .catch((err) => {
            return Promise.reject(err)
        }) 
}

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'sachin')
    } catch (err) {
        return Promise.reject(err)
    }
console.log(tokenData)
    return User.findOne({
            _id: tokenData.userId,
            'tokens.token': token
        })
        .then((user) => {
            console.log('insideFindByToken')
            return new Promise((resolve, reject) => {
                resolve(user)
            })
        })
        .catch((err) => {
            console.log('insideFindByCatch')

            return new Promise((resolve, reject) => {
                reject(err)
            })
        })
}

userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        userId: user._id
    }

    const token = jwt.sign(tokenData, 'sachin')
    user.tokens.push({
        token
    })
    return user.save().then((user) => {
        return token

    }).catch((err) => {
        return err
    })
}

const User = mongoose.model('User', userSchema)


module.exports = {
    User
}