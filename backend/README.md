# Myappy Backend v1.0.0

## Installation
```bash
npm install
npm run dev
```

## Environment Variables
Create `.env` file:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/myappy
JWT_SECRET=your_jwt_secret
PORT=4000
```

## API Flow (use Postman)
1. POST /api/auth/register
2. POST /api/auth/login -> get token
3. POST /api/listings (with Bearer token)
4. POST /api/orders (with listingId)
5. POST /api/payments/:orderId
6. POST /api/chatbot (with message)
