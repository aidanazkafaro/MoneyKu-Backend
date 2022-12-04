 const express = require('express')
const db = require ('./src/config/config')
const app = express()
const bp = require('body-parser')
const moneykuRoute = require ('./src/Routes/Routes')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
require('dotenv').config();
app.use('/moneyku', moneykuRoute)

app.listen(1234, () => {
    console.log("Port 1234 berhasil dijalankan")
})

