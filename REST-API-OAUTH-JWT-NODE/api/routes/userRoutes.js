// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const crudController = require('../controllers/crudController');

console.log('crudController:', crudController); // Log the imported crudController

router.get('/user', authMiddleware, (req, res, next) => {
    console.log('crudController.users:', crudController.users); // Log the users method
    if (typeof crudController.users !== 'function') {
        return res.status(500).send('Error: crudController.users is not a function');
    }
    crudController.users(req, res, next);
});

router.get('/userInfo/:id', authMiddleware, (req, res, next) => {
    console.log('crudController.find:', crudController.find); // Log the find method
    if (typeof crudController.find !== 'function') {
        return res.status(500).send('Error: crudController.find is not a function');
    }
    crudController.find(req, res, next);
});

router.post('/user', authMiddleware, (req, res, next) => {
    console.log('crudController.AddInfo:', crudController.AddInfo); // Log the AddInfo method
    if (typeof crudController.AddInfo !== 'function') {
        return res.status(500).send('Error: crudController.AddInfo is not a function');
    }
    crudController.AddInfo(req, res, next);
});

router.put('/updateuserInfo/:id', authMiddleware, (req, res, next) => {
    console.log('crudController.PutInfo:', crudController.PutInfo); // Log the PutInfo method
    if (typeof crudController.PutInfo !== 'function') {
        return res.status(500).send('Error: crudController.PutInfo is not a function');
    }
    crudController.PutInfo(req, res, next);
});

router.patch('/updateuserInfopartial/:id', authMiddleware, (req, res, next) => {
    console.log('crudController.PatchInfo:', crudController.PatchInfo); // Log the PatchInfo method
    if (typeof crudController.PatchInfo !== 'function') {
        return res.status(500).send('Error: crudController.PatchInfo is not a function');
    }
    crudController.PatchInfo(req, res, next);
});

router.delete('/deleteUserinfo/:username', authMiddleware, (req, res, next) => {
    console.log('crudController.delete:', crudController.delete); // Log the delete method
    if (typeof crudController.delete !== 'function') {
        return res.status(500).send('Error: crudController.delete is not a function');
    }
    crudController.delete(req, res, next);
});

module.exports = router;
