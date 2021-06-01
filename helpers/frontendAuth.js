const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/frontend', (req, res) => {
    const token = req.params.token || req.body.token || req.headers['x-access-token'] || req.headers.token

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({status:false, message:'Token authentication failed.'})
                return false
            } else {
                req.decode = decoded
                res.json({status:true})
                return true
            }
        })
    } else {
        res.json({status:false, message:'Token not provided.'})
        return false
    }
})

module.exports = router