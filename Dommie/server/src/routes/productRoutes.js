import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  validateProductIdParam,
  createProductValidator,
  updateProductValidator,
  listProductsQueryValidator,
} from '../validators/productValidators.js';

const router = express.Router();

// TASK 2 — Product CRUD Routes
// Public Read Endpoints
router.get('/', listProductsQueryValidator, validate, getProducts);
router.get('/:id', validateProductIdParam, validate, getProductById);

// Protected Write Endpoints (Authenticated)
router.post('/', authenticate, createProductValidator, validate, createProduct);
router.put('/:id', authenticate, updateProductValidator, validate, updateProduct);
router.delete('/:id', authenticate, validateProductIdParam, validate, deleteProduct);

export default router;
