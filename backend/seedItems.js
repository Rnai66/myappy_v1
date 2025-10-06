import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./src/models/itemModel.js";

dotenv.config();

const items = [
  {
    name: "iPhone 13 มือสอง",
    description: "สภาพดี ใช้งานน้อย มีรอยนิดหน่อย",
    price: 18500,
    image: "https://via.placeholder.com/200?text=iPhone+13",
    country: "Thailand",
    province: "Bangkok",
    district: "Pathum Wan",
    subdistrict: "Lumphini",
    village: "หมู่บ้านกลางเมือง",
    location: "ใกล้ BTS สยาม",
  },
  {
    name: "จักรยานเสือภูเขา",
    description: "มือสอง ใช้งาน 1 ปี ยางใหม่",
    price: 5500,
    image: "https://via.placeholder.com/200?text=Bike",
    country: "Thailand",
    province: "Khon Kaen",
    district: "Mueang",
    subdistrict: "ในเมือง",
    village: "บ้านหนองแวง",
    location: "ใกล้ มข.",
  },
  {
    name: "โน้ตบุ๊ก ASUS",
    description: "Core i7, RAM 16GB, SSD 512GB",
    price: 22000,
    image: "https://via.placeholder.com/200?text=Laptop",
    country: "Thailand",
    province: "Chiang Mai",
    district: "Mueang",
    subdistrict: "สุเทพ",
    village: "หมู่บ้านกาญจน์กนก",
    location: "ใกล้ ม.เชียงใหม่",
  },
  {
    name: "เครื่องซักผ้า LG",
    description: "ฝาหน้า 7 กก. ใช้งานปกติ",
    price: 4500,
    image: "https://via.placeholder.com/200?text=Washer",
    country: "Thailand",
    province: "Khon Kaen",
    district: "Mueang",
    subdistrict: "ในเมือง",
    village: "บ้านโนนทัน",
    location: "ใกล้ โรงบาลศรีนครินทร์",
  },
  {
    name: "โต๊ะไม้สัก",
    description: "งานไม้แท้ 100% แข็งแรง",
    price: 7500,
    image: "https://via.placeholder.com/200?text=Table",
    country: "Thailand",
    province: "Bangkok",
    district: "Lat Krabang",
    subdistrict: "คลองสามประเวศ",
    village: "บ้านสวนโอเอซิส",
    location: "ใกล้ ร่มเกล้า",
  },
];

const seedItems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Item.deleteMany();
    console.log("🗑 ลบสินค้าเก่าเรียบร้อย");

    await Item.insertMany(items);
    console.log("✅ เพิ่มสินค้าตัวอย่างเรียบร้อย");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding items:", error);
    process.exit(1);
  }
};

seedItems();
