const express=require('express');
const centerController = require('../controllers/center.controller');
const router=express.Router();

router.post('/centre',centerController.register);

router.get('/centre', centerController.getCenters);

router.delete('/centre/:id', centerController.removeCenter);

module.exports=router;