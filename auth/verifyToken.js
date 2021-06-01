const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuth = (req, res, next) => {

    const token  = req.params.token || req.body.token || req.headers['x-access-token'] || req.headers.token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) return res.sendStatus(403).json({message: 'You are not authorized'})
        console.log(data)
        next()
    })
}

module.exports = isAuth


















// const jwt = require('jsonwebtoken');
// require('dotenv').config()

// const isAuth = (req, res, next) => {
// 	const token  = req.params.token || req.body.token || req.headers['x-access-token'] || req.headers.token

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
//         if(err) return res.sendStatus(403)
//         console.log(data)
//         next()
//     })
// };

// module.exports =  isAuth
