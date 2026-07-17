import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Product from "./models/Product.js";

// Fallback seed products if API fetch fails
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-albTqL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBHV8TofL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 }
  },
  {
    id: 14,
    title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screens side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: { rate: 2.2, count: 140 }
  }
];

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[ShopEZ MongoDB] Connected: ${conn.connection.host}`);
    await seedDatabase();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    // 1. Seed Demo User if not exists
    const demoExists = await User.findOne({ email: "demo@shopez.com" });
    if (!demoExists) {
      console.log("Seeding demo user into MongoDB...");
      const passwordHash = await bcrypt.hash("password123", 10);
      const demoUser = new User({
        name: "Demo User",
        email: "demo@shopez.com",
        password: passwordHash
      });
      await demoUser.save();
      console.log("Demo user seeded successfully.");
    }

    // Seed Admin User if not exists
    const adminExists = await User.findOne({ email: "admin@shopez.com" });
    if (!adminExists) {
      console.log("Seeding admin user into MongoDB...");
      const adminPasswordHash = await bcrypt.hash("admin123", 10);
      const adminUser = new User({
        name: "Admin User",
        email: "admin@shopez.com",
        password: adminPasswordHash,
        isAdmin: true
      });
      await adminUser.save();
      console.log("Admin user seeded successfully.");
    }

    // 2. Seed Products if empty
    
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("Catalog is empty. Seeding products into MongoDB...");
      let productsData = FALLBACK_PRODUCTS;

      try {
       console.log("Fetching products from DummyJSON...");

const res = await fetch("https://dummyjson.com/products?limit=194");

if (res.ok) {
  const data = await res.json();

  productsData = data.products.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.thumbnail,
    rating: {
      rate: item.rating,
      count: item.stock,
    },
  }));

  console.log(`Successfully fetched ${productsData.length} products.`);
}
      } catch (err) {
        console.warn("Failed to fetch fresh products from API. Using fallback seed products.", err.message);
      }

      await Product.insertMany(productsData);
      console.log(`Seeded ${productsData.length} products to database.`);
    }
  } catch (error) {
    console.error("Seeding database error:", error.message);
  }
}
