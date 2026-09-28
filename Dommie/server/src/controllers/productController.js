import Product from '../models/Product.js';

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;

    const queryFilter = {};

    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      queryFilter.category = new RegExp(`^${category.trim()}$`, 'i');
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      queryFilter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ];
    }

    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNumber - 1) * limitNumber;

    const [products, total] = await Promise.all([
      Product.find(queryFilter)
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Product.countDocuments(queryFilter),
    ]);

    return res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber) || 1,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('createdBy', 'name email');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID '${id}' was not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      imageUrl: imageUrl && imageUrl.trim() !== '' ? imageUrl.trim() : undefined,
      createdBy: req.user._id,
    });

    const populatedProduct = await product.populate('createdBy', 'name email');

    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      product: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Cannot update. Product with ID '${id}' does not exist.`,
      });
    }

    const { name, description, price, category, stock, imageUrl } = req.body;

    if (name !== undefined) existingProduct.name = name;
    if (description !== undefined) existingProduct.description = description;
    if (price !== undefined) existingProduct.price = Number(price);
    if (category !== undefined) existingProduct.category = category;
    if (stock !== undefined) existingProduct.stock = Number(stock);
    if (imageUrl !== undefined) {
      existingProduct.imageUrl = imageUrl.trim() !== '' ? imageUrl.trim() : existingProduct.imageUrl;
    }

    const updatedProduct = await existingProduct.save();
    await updatedProduct.populate('createdBy', 'name email');

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Cannot delete. Product with ID '${id}' was not found.`,
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
      deletedId: id,
    });
  } catch (error) {
    next(error);
  }
};
