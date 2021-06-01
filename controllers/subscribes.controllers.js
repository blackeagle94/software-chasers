const SubscribeModel = require('../model/Subscribe.model')
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
})

exports.getAllSubscribes = (req, res) => {
    SubscribeModel.find()
    .then(data => res.json(data))
    .catch(err => res.json({error: err}))
}

exports.createSubscribe = (req, res) => {
    const {email} = req.body

    const newSubscribe = new SubscribeModel({email:email})

    newSubscribe.save()
        .then(response => response)
        .then(data => {
            const options = {
                from:process.env.email,
                to:email,
                subject:'Nodemailer',
                text:'Hello from Nodemailer'
            }
            transporter.sendMail(options, (err, info) => {
                if(err) {
                    res.json({error:err, status:false})
                    return
                } else {
                    res.json({message:'Subscribed Successfully and Email Sent', status:true, info, data})
                }
            })
        })
        .catch(err => res.json({error:err, status:false}))
}

exports.deleteSubscribe = (req, res) => {
    const {id} = req.params

    SubscribeModel.findByIdAndDelete({_id:id})
        .then(data => res.json({message:'Deleted Successfully', status:true, data}))
        .catch(err => res.json({error:err, status:false}))
}