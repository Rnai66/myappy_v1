const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');


dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send("✅ MyAppy Backend is running...");
});


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/listings', require('./routes/listing'));

// Static files (frontend build หรือ public)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
connectDB();

// ===== Auto Port Handling =====
const PORT = process.env.PORT || 4000;
let server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${server.address().port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} is in use, trying another one...`);
    const newPort = parseInt(PORT) + 1;
    server = app.listen(newPort, () => {
      console.log(`🚀 Server running on port ${server.address().port}`);
    });
  } else {
    console.error('❌ Server error:', err);
  }
});
// ...
async function connectDB() {
  try {
    await client.connect();
    db = client.db("myappy");
    console.log("✅ Connected to MongoDB Atlas");

    // โหลด routes
    const mainRoutes = require("./routes")(db);
    app.use("/api", mainRoutes);
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  }
}
connectDB();

