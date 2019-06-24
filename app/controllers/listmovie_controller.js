const express = require('express')
const router = express.Router()
const { ListMovie } = require('../models/listmovie')
const { authenticateUser } = require('../middleware/authenticate')
const { upload } = require('../middleware/imageUploads')
const {User}=require('../models/user')
const {Genere} = require('../models/genere')
router.get('/name',(req, res) => {
    const name = req.query.title
    console.log(name)
    ListMovie.find({title:name})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/', (req, res) => {
    ListMovie.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    ListMovie.findById(id)
        .then((listmovie) => {
            if (listmovie) {
                res.send(listmovie)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
        res.send(err)
    })
})

router.post('/', upload.array('image', 4), authenticateUser, (req, res) => {
    const body = req.body
    const images = []
    req.files.forEach(file => {
        const imageUrl = file.destination
        console.log(imageUrl)
        const link = "http://localhost:3001"+imageUrl.slice(1) + file.filename
        images.push(link)
    })
    console.log(req.files)

    body.image = images
    const listmovie = new ListMovie(body)
    console.log(req.body,"post")
    listmovie.user = req.user._id
    listmovie.save()
        .then((listmovie) => {
            res.send(listmovie)
        })
        .catch((err) => {
            res.send(err)
        })
})

// router.post('/',authenticateUser, (req, res) => {
//     const body = req.body
//     const listmovie = new ListMovie(body)
//     console.log(listmovie ,'ojj')
//     listmovie.save()
//         .then((data) => {
//             console.log(data,"hi")
//             res.send(data)
//         })
//         .catch((err) => {
//         res.send(err)
//     })
// })

router.put('/:id',authenticateUser,(req, res) => {
    const id = req.params.id
    const listmovie = req.body
    ListMovie.findByIdAndUpdate({ _id: id }, {$set: listmovie },{new:true})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id',authenticateUser,(req, res) => {
    const id = req.params.id
    console.log(id)
    ListMovie.findByIdAndDelete(id)
        .then((listmovie) => {
                res.send(listmovie)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    listmovieRouter: router
}

