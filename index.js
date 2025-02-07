const express = require('express')
const mongoose = require('./config/database')
const cors = require('cors')
const {usersRouter} = require('./app/controllers/users_controller')
const { listmovieRouter } = require('./app/controllers/listmovie_controller')
const {genereRouter} = require('./app/controllers/generes_controller')
const app = express()
app.use(express.json()) //used for handling incoming json data

app.use(cors())
const port = 3001
app.get('/', (req, res) => {
    res.send('welcome to cinema world')
})
app.use('/users',usersRouter)
app.use('/movies',listmovieRouter)
app.use('/genere', genereRouter)
app.use('/public/uploads', express.static('public/uploads'))

app.listen(port, () => {
    console.log('listening to port', port)
})

