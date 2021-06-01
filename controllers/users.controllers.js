const UserModel = require('../model/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getAllUsers = async (req, res) => {
    await UserModel.aggregate([
        {
            $lookup: {
                from: "posts", 
                localField: "_id",
                foreignField: "userId",
                as: "posts",
              }
        }
    ], (err, result) => {
        if(err) {
            res.status(500).json(err)
        } else {
            res.json({total:result.length, result})
        }
    })
    // .then(data => res.json(data))
    // .catch(err => res.json({message: err}))
}

exports.createUser = async (req, res) => {
    const {firstname, lastname, email, password} = req.body

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
        firstname, lastname, email, password:hashedPassword
    })

    newUser.save()
            .then(data => res.json({status: true, message: 'Signed up successfully', data}))
            .catch(err => res.json({status: false, message: err}))
}

exports.login = async (req, res)=> {
    const {email, password} = req.body

    await UserModel.findOne({email:email}).then(async (data) => {
       if (await bcrypt.compare(password, data.password)) {
           const token = jwt.sign({name: email, role: data.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
           res.json({
               status:true,
               firstname: data.firstname,
               lastname:data.lastname,
               email:data.email,
               id:data._id,
               token:token
           })
       } else {
           res.json({status:false, message: 'Wrong password'})
       }
    })
    .catch(err => res.json({status:false, message: 'Email not exist'}))
}

exports.updateUser = async (req, res) => {
    await UserModel.findByIdAndUpdate({_id: req.params.id}, {$set: req.body})
        .then(data => res.json({message: 'Successfully updated', data}))
        .catch(err => res.json({message: err}))
}

exports.deleteUser = async (req, res) => {
    await UserModel.findByIdAndRemove({_id:req.params.id})
    .then(data => res.json({message: 'Successfully removed', data}))
    .catch(err => res.json({message: err}))
}


























// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const UserModel = require('../model/User.model')
// require('dotenv').config()

// const generateToken = user => {
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
// }

// exports.getAllUsers = async (req, res) => {
//     await UserModel.find()
//         .then(data => res.json(data))
//         .catch(err => res.json({message: err}))
// }

// exports.createUser = async (req, res) => {
//     const {firstname, lastname, email, password} = req. body
//     const salt = await bcrypt.genSalt()
//     const hashedPassword = await bcrypt.hash(password, salt)
//     const newUser = await new UserModel({
//         firstname, lastname, email, password:hashedPassword
//     })

//     newUser.save().then(data => res.json({status: true, message:'Signed up successfully'})).catch(err => res.json({status:false, message:err}))
// }

// exports.login = async (req, res) => {
//     const {email, password} = req. body
//     await UserModel.findOne({email}).then( async (data) => {
//        if (await bcrypt.compare(password, data.password)) {
//            res.json({
//                id:data._id,
//                firstname:data.firstname,
//                lastname:data.lastname,
//                email:data.email,
//                token:generateToken({name:email, role:data.role})
//            })
//        } else {
//            res.json({status: false, message:'Wrong Password'})
//        }
//     }).catch(err => {
//         res.json(err)
//     })
// }

// exports.updateUser = async (req, res) => {
//     await UserModel.findByIdAndUpdate({_id: req.params.userid}, {$set: req.body})
// }

// exports.deleteUser = async (req, res) => {
//     await UserModel.findByIdAndRemove({_id: req.params.userid}).then(data => res.json(data)).catch(err => res.json({message:err}))
// }