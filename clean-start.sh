#!/bin/bash

echo "🚨 Proje temizleniyor..."

rm -rf node_modules
rm -rf .expo
rm -rf .expo-shared
rm -rf package-lock.json
rm -rf ios/build
rm -rf android/build
rm -rf .metro-cache
rm -rf .git/modules/*

echo "📦 Paketler yeniden yükleniyor..."
npm install

echo "🚀 Expo temiz başlatılıyor..."
npx expo start --clear
