const express= require('express')
const router = express();

const urlModule = require('../urlModule')


router.post('/createUrl', urlModule.createUrl)

router.get('/showUrl', urlModule.showUrl)

router.get('/:urlId', urlModule.showUrlid)

router.get('/delete/:id', urlModule.deleteUrlid)



module.exports= router