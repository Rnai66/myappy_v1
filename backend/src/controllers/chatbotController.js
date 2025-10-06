export const chatbotResponse = (req, res) => {
  const { message } = req.body;

  let reply = "🤖 ขอโทษครับ ฉันไม่เข้าใจคำถามนี้";
  if (message.includes("สวัสดี")) reply = "สวัสดีครับ! ยินดีต้อนรับสู่ Myappy 💚";
  if (message.includes("ซื้อ")) reply = "เลือกสินค้า → กด Buy → ชำระเงินผ่านระบบที่ปลอดภัย 🔒";
  if (message.includes("ขาย")) reply = "ไปที่ Post Listing → ใส่รายละเอียดสินค้า → รอผู้ซื้อ 👀";

  res.json({ reply });
};
