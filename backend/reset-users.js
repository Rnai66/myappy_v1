// reset-users.js
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is not defined. Please set it in your .env file.");
  process.exit(1);
}

const client = new MongoClient(uri);

async function resetUsers() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("myappy");
    const users = db.collection("users");

    // 1. ลบ users ทั้งหมด
    const result = await users.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} users from collection.`);

    // 2. สร้าง default users (ใช้ bcrypt hash)
    const hashedAdminPassword = await bcrypt.hash("123456", 10);
    const hashedTestPassword = await bcrypt.hash("123456", 10);

    const defaultUsers = [
      {
        username: "admin",
        email: "admin@myappy.com",
        password: hashedAdminPassword,
        role: "admin",
        profile: {
          fullName: "Administrator",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        createdAt: new Date()
      },
      {
        username: "testuser",
        email: "test@myappy.com",
        password: hashedTestPassword,
        role: "user",
        profile: {
          fullName: "Test User",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        createdAt: new Date()
      }
    ];

    const insertResult = await users.insertMany(defaultUsers);
    console.log(`✅ Inserted ${insertResult.insertedCount} default users.`);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

resetUsers();
