import { body, param, query } from 'express-validator';

export const validateProductIdParam = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID format'),
];

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Product name must be between 2 and 120 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Product name must contain letters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Description must contain words'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 1 })
    .withMessage('Price must be at least ₹1'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),

  body('stock')
    .notEmpty()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be 0 or more'),

  body('imageUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
];

export const updateProductValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID format'),

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product name cannot be empty')
    .isLength({ min: 2, max: 120 })
    .withMessage('Product name must be between 2 and 120 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Product name must contain letters'),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product description cannot be empty')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Description must contain words'),

  body('price')
    .optional()
    .isFloat({ min: 1 })
    .withMessage('Price must be at least ₹1'),

  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be 0 or more'),

  body('imageUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
];

export const listProductsQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page query must be an integer greater than 0'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 200 })
    .withMessage('Limit query must be an integer between 1 and 200'),
  query('category')
    .optional()
    .trim(),
  query('search')
    .optional()
    .trim(),
];
