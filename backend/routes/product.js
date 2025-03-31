import express from 'express'
import { createProduct, getAllProducts, getSingleProduct, wishlistProduct } from '../controllers/product_controller.js';

const router=express.Router();

router.post('/createProduct',createProduct);
router.get('/getAllProducts',getAllProducts);
router.post('/wishlistProduct',wishlistProduct);
router.get('/getSingleProduct/:id',getSingleProduct);



export default router;