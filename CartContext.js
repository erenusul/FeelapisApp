import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // addToCart fonksiyonunu quantity kontrolü ile güncelledim:
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Ürün zaten varsa miktarını 1 artır
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Yeni ürün ise quantity 1 ile ekle
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Ürün miktarını güncellemek için fonksiyon
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // 1'den az olmasın
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Sepeti tamamen boşaltmak için fonksiyon
  const clearCart = () => {
    setCartItems([]);
  };

  // Yeni: Satın alma geçmişi için state
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Yeni: Satın alma geçmişine ekleme fonksiyonu
  const addPurchase = (purchase) => {
    setPurchaseHistory((prev) => [purchase, ...prev]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        purchaseHistory,  // Yeni
        addPurchase,      // Yeni
      }}
    >
      {children}
    </CartContext.Provider>
  );
};