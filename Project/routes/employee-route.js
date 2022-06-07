const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const router = express.Router();

//reffering the urls to the right function in the user-ctrl file
router.delete('/user/:id', UserCtrl.deleteUser);
router.get('/users', UserCtrl.getUsers);
router.post('/job', UserCtrl.createJob);
router.delete('/job/:id', UserCtrl.deleteJob);
router.get('/jobs', UserCtrl.getJobs);
router.get('/job/:id', UserCtrl.getJobById);
router.post('/user', UserCtrl.createUser);
router.patch('/job/:id', UserCtrl.updateJob);

module.exports = router;