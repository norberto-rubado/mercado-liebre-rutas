// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')

var multer = require('multer')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

var storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,'public/images/products')
    },
    filename : function(req,file,cb) {
        cb(null,file.fieldname+ '-' +Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage : storage})

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/',upload.any(), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id/edit',upload.any(), productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productsController.destroy); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

module.exports = router;
