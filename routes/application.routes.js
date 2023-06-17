const express=require('express');
const applicationController = require('../controllers/application.controller');
const router=express.Router();

router.post('/create',applicationController.createApplication);

router.post('/applications/:centre',applicationController.getApplicationByCenter);

router.post('/applications',applicationController.getApplications);


module.exports=router;