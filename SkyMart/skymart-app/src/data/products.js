// Mock data for SkyMart
// Categories: Electronics, Clothing, Home & Kitchen, Books, Sports & Fitness, Beauty & Personal Care

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Sports & Fitness",
  "Beauty & Personal Care",
];

const generateId = () => Math.random().toString(36).substring(2, 9);

// Seed 100+ products
const products = [
  // --- Electronics (25) ---
  {
    id: "elec-001",
    name: "iPhone 15 Pro",
    category: "Electronics",
    description: "The ultimate iPhone with aerospace-grade titanium design, A17 Pro chip, and a more advanced 48MP Main camera system.",
    specs: { Brand: "Apple", Model: "iPhone 15 Pro", Weight: "187g", Display: "6.1-inch Super Retina XDR" },
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.8,
    reviewCount: 342,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048132924-f183789fbf0e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048133036-7013149e2cf4?q=80&w=1000&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r1", user: "Darsh P.", rating: 5, date: "2024-03-12", text: "Amazing phone, battery life is stellar." },
      { id: "r2", user: "Mahek M.", rating: 4, date: "2024-02-28", text: "Great camera, but runs a bit warm." }
    ]
  },
  {
    id: "elec-002",
    name: "MacBook Pro M3 Max",
    category: "Electronics",
    description: "Mind-blowing performance. Eye-popping battery life. That’s the efficiency of Apple silicon. Up to 22 hours of battery life.",
    specs: { Brand: "Apple", Model: "MacBook Pro 16\"", CPU: "M3 Max", RAM: "36GB" },
    price: 3499.00,
    originalPrice: 3499.00,
    rating: 4.9,
    reviewCount: 128,
    stock: 12,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"],
    reviews: []
  },
  {
    id: "elec-003",
    name: "Sony WH-1000XM5",
    category: "Electronics",
    description: "Industry Leading Noise Canceling Wireless Headphones with Auto Noise Canceling Optimizer.",
    specs: { Brand: "Sony", Type: "Over-ear", "Battery Life": "30 Hours", ANC: "Yes" },
    price: 398.00,
    originalPrice: 429.00,
    rating: 4.7,
    reviewCount: 890,
    stock: 120,
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop"],
    reviews: []
  },
  {
    id: "elec-004",
    name: "Samsung Odyssey G9",
    category: "Electronics",
    description: "49-inch Curved Gaming Monitor with 240Hz refresh rate and 1ms response time.",
    specs: { Brand: "Samsung", Size: "49-inch", Resolution: "5120x1440", RefreshRate: "240Hz" },
    price: 1399.00,
    originalPrice: 1799.00,
    rating: 4.6,
    reviewCount: 245,
    stock: 8,
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop"],
    reviews: []
  },
  {
    id: "elec-005",
    name: "Keychron Q1 Pro",
    category: "Electronics",
    description: "A premium full metal QMK/VIA wireless custom mechanical keyboard.",
    specs: { Brand: "Keychron", Layout: "75%", Material: "Aluminum", Switches: "K Pro Banana" },
    price: 199.00,
    originalPrice: 199.00,
    rating: 4.8,
    reviewCount: 156,
    stock: 35,
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop"],
    reviews: []
  },
  // Add more electronics here... (Generating a subset for code size, normally we'd loop or use a faker library)
];

// Helper to generate generic products to reach 100+
const genericProductGenerators = [
  { cat: "Clothing", prefix: "Premium", suffixes: ["T-Shirt", "Hoodie", "Jeans", "Jacket", "Sneakers", "Socks", "Cap", "Scarf"], priceRange: [20, 150] },
  { cat: "Home & Kitchen", prefix: "Smart", suffixes: ["Coffee Maker", "Blender", "Air Purifier", "Vacuum", "Lamp", "Toaster", "Kettle", "Microwave"], priceRange: [40, 400] },
  { cat: "Books", prefix: "The Art of", suffixes: ["Coding", "Design", "Leadership", "Productivity", "Mindfulness", "Finance", "Cooking", "Strategy"], priceRange: [15, 60] },
  { cat: "Sports & Fitness", prefix: "Pro", suffixes: ["Yoga Mat", "Dumbbells", "Resistance Bands", "Treadmill", "Jump Rope", "Foam Roller", "Water Bottle", "Gym Bag"], priceRange: [10, 500] },
  { cat: "Beauty & Personal Care", prefix: "Organic", suffixes: ["Face Serum", "Moisturizer", "Shampoo", "Body Wash", "Sunscreen", "Lip Balm", "Perfume", "Beard Oil"], priceRange: [15, 120] },
  { cat: "Electronics", prefix: "Ultra", suffixes: ["Smartwatch", "Earbuds", "Tablet", "Camera", "Drone", "Speaker", "Power Bank", "Webcam"], priceRange: [50, 800] }
];

const categoryImages = {
  "Clothing": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop",
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Books": [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
  ],
  "Sports & Fitness": [
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
  ],
  "Beauty & Personal Care": [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop",
  ],
  "Electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop",
  ]
};

let idCounter = 6;
genericProductGenerators.forEach(gen => {
  for (let i = 0; i < 20; i++) {
    const suffix = gen.suffixes[i % gen.suffixes.length];
    const price = Math.floor(Math.random() * (gen.priceRange[1] - gen.priceRange[0]) + gen.priceRange[0]);
    const hasDiscount = Math.random() > 0.7;
    const catImages = categoryImages[gen.cat] || categoryImages["Electronics"];
    const randomImage = catImages[Math.floor(Math.random() * catImages.length)];
    
    products.push({
      id: `prod-${idCounter++}`,
      name: `${gen.prefix} ${suffix} ${i + 1}`,
      category: gen.cat,
      description: `High-quality ${suffix.toLowerCase()} designed for everyday use. Features premium materials and excellent durability.`,
      specs: { Material: "Premium", Warranty: "1 Year", Origin: "Imported" },
      price: price,
      originalPrice: hasDiscount ? price + Math.floor(price * 0.2) : price,
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
      reviewCount: Math.floor(Math.random() * 500),
      stock: Math.floor(Math.random() * 100),
      images: [randomImage],
      reviews: []
    });
  }
});

export { products, categories };
