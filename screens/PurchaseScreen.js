import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import { CartContext } from '../CartContext';

export default function PurchaseScreen({ route, navigation }) {
  const { product } = route.params;
  const { removeFromCart, addPurchase } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const safePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const cleaned = price.replace(/[^\d,.-]/g, '').replace(',', '.');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const price = safePrice(product.price);

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Satın alma butonuna basınca ödeme sayfasına giderken satın alma kaydı ekleniyor
  const handleProceedToPayment = () => {
    const purchaseRecord = {
      id: Date.now().toString(),
      product,
      quantity,
      totalPrice: price * quantity,
      purchaseDate: new Date().toISOString(),
    };

    addPurchase(purchaseRecord);

    navigation.navigate('PaymentMethods', {
      product,
      quantity,
      price: price * quantity,
      removeFromCart,
    });
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Satın Alma</Text>
        <Image
          source={
            product.isCustomDesign
              ? require('../assets/kisiseltasarim.png')
              : typeof product.images?.[0] === 'string'
                ? { uri: product.images[0] }
                : product.images?.[0] || require('../assets/kisiseltasarim.png')
          }
          style={styles.productImage}
        />
      </View>

      <Text style={styles.productName}>
        {product.isCustomDesign ? 'Özel Tasarım Takı' : product.name}
      </Text>
      <Text style={styles.productPrice}>₺{(price * quantity).toFixed(2)}</Text>

      {product.isCustomDesign && product.stones && product.thread && (
        <>
          <Text style={styles.label}>Seçilen Taşlar:</Text>
          {product.stones.map((stone, index) => (
            <Text key={index} style={styles.detailItem}>
              • {stone.name}
            </Text>
          ))}
          <Text style={styles.label}>Seçilen İp Çeşidi:</Text>
          <Text>{product.thread.name}</Text>
        </>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Adet:</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityBtn} onPress={decrementQuantity}>
            <Text style={styles.quantityBtnText}>-</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(text) => {
              const num = parseInt(text);
              if (!isNaN(num) && num > 0) setQuantity(num);
            }}
          />

          <TouchableOpacity style={styles.quantityBtn} onPress={incrementQuantity}>
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.buyButton} onPress={handleProceedToPayment}>
        <Text style={styles.buyButtonText}>Ödeme Yöntemleri</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff5f8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#bb879e',
    borderBottomColor: '#bb879e',
    borderBottomWidth: 2,
    paddingBottom: 8,
    marginTop: 50,
  },
  productImage: {
    width: 170,
    height: 170,
    borderRadius: 16,
    marginBottom: 5,
    top: 110,
    marginLeft: 10,
  },
  productName: { fontSize: 22, fontWeight: '600', marginBottom: 6, color: '#bb879e' },
  productPrice: { fontSize: 18, marginBottom: 20, color: '#bb879e' },
  section: { marginTop: 20, marginBottom: 10 },
  label: { fontWeight: '600', marginBottom: 8, color: '#bb879e' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#bb879e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnText: { fontSize: 24, color: '#fff', fontWeight: '700' },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#bb879e',
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 8,
    fontSize: 18,
    minWidth: 60,
    textAlign: 'center',
    color: '#000',
  },
  buyButton: {
    backgroundColor: '#bb879e',
    marginTop: 40,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#bb879e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  buyButtonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  detailItem: {
    marginLeft: 8,
    fontSize: 16,
    marginBottom: 4,
  },
});