const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/users.controllers')
const isAdmin = require('../auth/isAdmin')

router.get('/users', userControllers.getAllUsers)
router.post('/users/signup', userControllers.createUser)
router.post('/users/login', userControllers.login)
router.put('/users/:id', isAdmin, userControllers.updateUser)
router.delete('/users/:id', isAdmin, userControllers.deleteUser)

module.exports = router


























// const express = require('express')
// const router = express.Router()
// const userControllers = require('../controllers/users.controllers')
// const isAdmin = require('../auth/isAdmin')

// router.get('/', userControllers.getAllUsers)
// router.post('/', userControllers.createUser)
// router.post('/login', userControllers.login)
// router.put('/:userid', isAdmin, userControllers.updateUser)
// router.delete('/:userid', isAdmin, userControllers.deleteUser)

// module.exports = router