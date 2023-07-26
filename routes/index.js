const userController = require('../controllers/userController');
const logController = require('../controllers/logController');
const express = require('express');
const router = express.Router();

router.post('/register', userController.register)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.put('/user/:userEmail', userController.update)

router.delete('/user/:userEmail', userController.delete)

router.post('/user/archive', userController.archive)

router.get('/user/archived', userController.getArchived)

router.get('/user/search', userController.search)

router.delete('/log/:id', logController.delete)

router.get('/log/:email', logController.getByUserEmail)

router.get('/log/recent/:email', logController.recentLogs)

module.exports = router;