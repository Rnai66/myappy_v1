#!/bin/bash

API_URL="http://localhost:5100/api"

echo "🔹 Step 1: Register user"
curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "demo", "email": "demo@example.com", "password": "123456"}'
echo -e "\n"

echo "🔹 Step 2: Login user"
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "demo@example.com", "password": "123456"}')

echo $LOGIN_RESPONSE
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "✅ Got Token: $TOKEN"
echo -e "\n"

echo "🔹 Step 3: Get My Profile"
curl -s -X GET $API_URL/users/me \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "🔹 Step 4: Create Listing"
CREATE_LISTING=$(curl -s -X POST $API_URL/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title": "iPhone 12 มือสอง", "description": "สภาพดี 95%", "price": 12000}')
echo $CREATE_LISTING
LISTING_ID=$(echo $CREATE_LISTING | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

echo "✅ Created Listing ID: $LISTING_ID"
echo -e "\n"

echo "🔹 Step 5: Get All Listings"
curl -s -X GET $API_URL/listings \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "🔹 Step 6: Delete Listing"
curl -s -X DELETE $API_URL/listings/$LISTING_ID \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "🎉 Workflow test completed!"

