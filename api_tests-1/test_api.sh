#!/bin/bash

BASE_URL="http://localhost:5101/api"

echo "🚀 Starting API Workflow Test..."

# 1. Register User
echo "📌 Step 1: Register User"
curl -s -X POST $BASE_URL/auth/register   -H "Content-Type: application/json"   -d '{"username":"demo","email":"demo@example.com","password":"123456"}'
echo -e "\n"

# 2. Login
echo "📌 Step 2: Login"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login   -H "Content-Type: application/json"   -d '{"email":"demo@example.com","password":"123456"}')

echo $LOGIN_RESPONSE
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "✅ Saved Token: $TOKEN"
echo -e "\n"

# 3. Get My Profile
echo "📌 Step 3: Get Profile"
curl -s -X GET $BASE_URL/users/me   -H "Authorization: Bearer $TOKEN"
echo -e "\n"

# 4. Create Listing
echo "📌 Step 4: Create Listing"
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/listings   -H "Content-Type: application/json"   -H "Authorization: Bearer $TOKEN"   -d '{"title":"First Item","description":"My first product","price":100}')

echo $CREATE_RESPONSE
LISTING_ID=$(echo $CREATE_RESPONSE | jq -r '._id')
echo "✅ Saved Listing ID: $LISTING_ID"
echo -e "\n"

# 5. Update Listing
echo "📌 Step 5: Update Listing"
curl -s -X PUT $BASE_URL/listings/$LISTING_ID   -H "Content-Type: application/json"   -H "Authorization: Bearer $TOKEN"   -d '{"title":"Updated Item","description":"Updated description","price":200}'
echo -e "\n"

# 6. Delete Listing
echo "📌 Step 6: Delete Listing"
curl -s -X DELETE $BASE_URL/listings/$LISTING_ID   -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "🎉 Workflow Test Completed!"
