import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import User from '../models/User.js';
import Product from '../models/Product.js';
import { allProducts } from './products.js';

const imagesFile = path.resolve(__dirname, 'productImages.json');
const imageMap = fs.existsSync(imagesFile)
  ? JSON.parse(fs.readFileSync(imagesFile, 'utf8'))
  : {};

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce_organic_db';
    await mongoose.connect(mongoUri);

    await User.deleteMany({});
    await Product.deleteMany({});

    const demoUser = await User.create({
      name: 'Elena Vance',
      email: 'elena@organicstore.com',
      password: 'Password123',
      role: 'admin',
    });

    const productsToInsert = allProducts.map((p) => ({
      ...p,
      imageUrl: imageMap[p.name]?.url || p.imageUrl,
      createdBy: demoUser._id,
    }));

    await Product.insertMany(productsToInsert);
    console.log(`Seeded ${productsToInsert.length} products successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
