const express = require('express')
const router = express.Router()
const { Genere } = require('../models/genere')
const { ListMovie } = require('../models/listmovie')
const {authenticateUser}=require('../middleware/authenticate')
router.get('/', (req, res) => {
    Genere.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
        res.send(err)
    })
})

// router.get('/:id', (req, res) => {
//     const id = req.params.id
//     Genere.findById(id)
//         .then((genere) => {
//             if (genere) {
//                 res.send(genere)
//             } else {
//                 res.send({})
//             }
//         })
//         .catch((err) => {
//         res.send(err)
//     })
// })

router.post('/', (req, res) => {
    const body = req.body
    const genere = new Genere(body)
    genere.save()
        .then((genere) => {
            res.send({
                genere,
            notice:"the genere is saved successfully"})
        })
        .catch((err) => {
        res.send(err)
    })
})
router.get('/:id',(req, res) => {
    const id = req.params.id
    Promise.all([
        Genere.findById(id),
ListMovie.find({genere:id})
    ])
        .then((data) => {
           console.log(data)
                res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id',authenticateUser,(req, res) => {
    const id = req.params.id
    const genere = req.body
    Genere.findByIdAndUpdate(id, genere, function (err, data) {
            if (err) {
                console.log(err)
            }
    })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id',authenticateUser,(req, res) => {
    const id = req.params.id
    Genere.findByIdAndDelete(id)
        .then((genere) => {
            if (genere) {
                res.send(genere)
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    genereRouter:router
}

