const { MongoClient, ServerApiVersion } = require('mongodb');

// ❗️ใส่ username และ password ที่ถูกต้อง
const uri = "mongodb+srv://rnaibro_db_user:MBTZ5IWXoylgcvjc@cluster0.s0gno4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
