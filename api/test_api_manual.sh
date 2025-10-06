#!/bin/bash

BASE_URL="http://localhost:5101/api"

echo "🚀 Manual API Test Menu"
echo "1) Register"
echo "2) Login"
echo "3) Get Profile"
echo "4) Create Listing"
echo "5) Update Listing"
echo "6) Delete Listing"
echo "q) Quit"

read -p "Choose an option: " choice

case $choice in
  1)
    echo "📌 Register User"
    curl -s -X POST $BASE_URL/auth/register \
      -H "Content-Type: application/json" \
      -d '{"username":"demo","email":"demo@example.com","password":"123456"}'
    ;;
  2)
    echo "📌 Login"
    curl -s -X POST $BASE_URL/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"demo@example.com","password":"123456"}'
    ;;
  3)
    read -p "Enter Token: " TOKEN
    echo "📌 Get Profile"
    curl -s -X GET $BASE_URL/users/me \
      -H "Authorization: Bearer $TOKEN"
    ;;
  4)
    read -p "Enter Token: " TOKEN
    echo "📌 Create Listing"
    curl -s -X POST $BASE_URL/listings \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{"title":"Manual Item","description":"Created manually","price":150}'
    ;;
  5)
    read -p "Enter Token: " TOKEN
    read -p "Enter Listing ID: " LISTING_ID
    echo "📌 Update Listing"
    curl -s -X PUT $BASE_URL/listings/$LISTING_ID \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{"title":"Manual Update","description":"Updated manually","price":250}'
    ;;
  6)
    read -p "Enter Token: " TOKEN
    read -p "Enter Listing ID: " LISTING_ID
    echo "📌 Delete Listing"
    curl -s -X DELETE $BASE_URL/listings/$LISTING_ID \
      -H "Authorization: Bearer $TOKEN"
    ;;
  q)
    echo "👋 Bye"
    exit 0
    ;;
  *)
    echo "❌ Invalid choice"
    ;;
esac
echo -e "\n"
