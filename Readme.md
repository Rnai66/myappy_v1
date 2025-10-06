# Myappy Backend v1.0.0

Backend สำหรับแอป **Myappy** (Marketplace สินค้ามือสอง + ระบบ Chatbot + Mock Payment)

## ⚙️ เทคโนโลยีที่ใช้
- Node.js + Express
- MongoDB Atlas (Mongoose ODM)
- JWT Authentication
- Postman (API Testing)

---

## 📂 โครงสร้างโปรเจค


backend/ │── src/ │ ├── config/db.js │ ├── middleware/authMiddleware.js │ ├── models/{User,Listing,Order,Payment}.js │ ├── controllers/{auth,listing,order,payment,chatbot}Controller.js │ ├── routes/{auth,listing,order,payment,chatbot}Routes.js │ └── server.js │── package.json │── nodemon.json │── .env.example


---

## 🔧 ขั้นตอนการติดตั้ง

### 1. Clone / แตกไฟล์ ZIP
```bash
unzip myappy-backend.zip
cd myappy-backend
