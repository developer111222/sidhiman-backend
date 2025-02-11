const express = require('express');
const router=express.Router();
const {creategallery,getgallery,deletegallery} =require('../controller/gallerycontroller');
const upload = require('../middleware/multer');
const { authorizationUser,
    authorizationRoles } = require('../middleware/authToken');



    router.route('/create-gallery').post(authorizationUser,authorizationRoles('admin'),upload.single('image'),creategallery);
    router.route('/get-gallery').get(getgallery);
    router.route('/delete-gallery-image/:id').delete(authorizationUser,authorizationRoles('admin'),deletegallery)


    module.exports=router
