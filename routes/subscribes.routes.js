const express = require('express')
const router = express.Router()
const subscribesControllers = require('../controllers/subscribes.controllers')

router.get('/subscribes', subscribesControllers.getAllSubscribes)
router.post('/subscribes', subscribesControllers.createSubscribe)
router.delete('/subscribes/:id', subscribesControllers.deleteSubscribe)

module.exports = router