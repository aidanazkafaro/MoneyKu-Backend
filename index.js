const express = require('express')
const db = require ('./src/config/config')
const app = express()
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
require('dotenv').config();


app.listen(1234, () => {
    console.log("Port 1234 berhasil dijalankan")
})

app.post('/registerAccount', (req, res) => {
    db.query(`INSERT INTO account (NAME, EMAIL, PASSWORD, balance) VALUES ('${req.body.name}', '${req.body.email}','${req.body.password}', ${req.body.balance});`, (err, results) => {
        if (err) {
            console.log(err)
            return
        }
        res.send('Account inserted successfully')
    })
})