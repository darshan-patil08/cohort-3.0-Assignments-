// fetchImages.js
// Finds a real photo on Pexels for every product and saves the result to productImages.json.
// Every photo is used at most once, so two products can never share an image.
//
// Run once:  node fetchImages.js
// Safe to re-run: products that already have an image are skipped, so it resumes where it stopped.

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { productsByCategory } from './products.js'; // data-only file, importing it does NOT touch the database

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error('Missing PEXELS_API_KEY. Get a free key at https://www.pexels.com/api/ and add it to your .env file.');
  process.exit(1);
}

const DELAY_MS = Number(process.env.PEXELS_DELAY_MS ?? 350);
const OUT_FILE = path.resolve(__dirname, 'productImages.json');

// Used only if every product-specific search fails.
const CATEGORY_FALLBACK = {
  Ceramics: 'handmade pottery',
  Textiles: 'handwoven textile',
  Apothecary: 'natural herbal skincare',
  Kitchenware: 'kitchen utensils',
  Lighting: 'decorative lamp',
  Stationery: 'notebook stationery',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// "Hand-Knotted Wool Rug 4x6 ft" -> "Hand Knotted Wool Rug"
const cleanName = (name) =>
  name
    .replace(/\bset of \d+\b/gi, ' ')
    .replace(/\b\d+(\.\d+)?\s*(x\s*\d+\s*)?-?\s*(inch|ml|gsm|ft|cm|litres?|g)\b/gi, ' ')
    .replace(/\b(a[345]|set|pair|trio)\b/gi, ' ')
    .replace(/\d+/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Most specific query first, then progressively broader ones.
const buildQueries = (name, category) => {
  const words = cleanName(name).split(' ');
  const variants = [
    words.join(' '),
    words.slice(-3).join(' '),
    words.slice(-2).join(' '),
    CATEGORY_FALLBACK[category],
  ];
  return [...new Set(variants.filter(Boolean))];
};

async function search(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { Authorization: API_KEY } });
    if (res.status === 429) {
      console.warn('Rate limited by Pexels. Waiting 60 seconds...');
      await sleep(60000);
      continue;
    }
    if (!res.ok) throw new Error(`Pexels returned ${res.status} for "${query}"`);
    const data = await res.json();
    return data.photos || [];
  }
  throw new Error('Rate limited repeatedly. Progress is saved, so run the script again later.');
}

const cache = fs.existsSync(OUT_FILE) ? JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')) : {};
const usedPhotoIds = new Set(Object.values(cache).map((entry) => entry.photoId));
const missing = [];

for (const [category, items] of Object.entries(productsByCategory)) {
  for (const product of items) {
    if (cache[product.name]) continue;

    let match = null;
    for (const query of buildQueries(product.name, category)) {
      const photos = await search(query);
      await sleep(DELAY_MS);
      const unused = photos.find((photo) => !usedPhotoIds.has(photo.id));
      if (unused) {
        match = { query, photo: unused };
        break;
      }
    }

    if (!match) {
      missing.push(product.name);
      console.warn(`[${category}] NO IMAGE FOUND: ${product.name}`);
      continue;
    }

    usedPhotoIds.add(match.photo.id);
    cache[product.name] = {
      url: match.photo.src.large,
      photoId: match.photo.id,
      query: match.query,
      alt: match.photo.alt || '',
    };
    // Save after every product so an interruption never loses progress.
    fs.writeFileSync(OUT_FILE, JSON.stringify(cache, null, 2));
    console.log(`[${category}] ${product.name}\n    query: "${match.query}"\n    photo: ${match.photo.alt || '(no description)'}`);
  }
}

console.log(`\nDone. ${Object.keys(cache).length} products have images.`);
if (missing.length) console.log(`Still missing (${missing.length}):\n - ${missing.join('\n - ')}`);
