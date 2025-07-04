import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const paymentCards = [
  {
    id: '1',
    name: 'Visa **** 1234',
    icon: <FontAwesome5 name="cc-visa" size={24} color="#1A1F71" />,
  },
  {
    id: '2',
    name: 'MasterCard **** 5678',
    icon: <FontAwesome5 name="cc-mastercard" size={24} color="#EB001B" />,
  },
  {
    id: '3',
    name: 'American Express **** 9012',
    icon: <FontAwesome5 name="cc-amex" size={24} color="#2E77BB" />,
  },
];

export default function PaymentMethodsScreen({ route, navigation }) {
  const { product, quantity, removeFromCart } = route.params;  // removeFromCart ve product da parametre olarak geldi
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handlePayment = () => {
    if (!selectedCardId) {
      alert('Lütfen bir ödeme kartı seçin.');
      return;
    }
    alert('Ödeme işlemi başarılı! Teşekkürler.');

    // Satın alınan ürün sepetten siliniyor
    if (product && removeFromCart) {
      removeFromCart(product.id);
    }

    navigation.popToTop(); // Ana sayfaya dön
  };

  const renderCardItem = ({ item }) => {
    const isSelected = item.id === selectedCardId;
    return (
      <TouchableOpacity
        style={[styles.cardItem, isSelected && styles.cardSelected]}
        onPress={() => setSelectedCardId(item.id)}
      >
        <View style={styles.iconWrapper}>{item.icon}</View>
        <Text style={styles.cardName}>{item.name}</Text>
        {isSelected && (
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color="#bb879e"
            style={{ marginLeft: 'auto' }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ödeme Yöntemleri</Text>
      <FlatList
        data={paymentCards}
        keyExtractor={(item) => item.id}
        renderItem={renderCardItem}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Ödemeyi Tamamla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#bb879e',
    marginBottom: 16,
    marginTop: 50,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardSelected: {
    borderColor: '#bb879e',
    backgroundColor: '#f9e9ed',
  },
  iconWrapper: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardName: {
    fontSize: 18,
    color: '#bb879e',
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#bb879e',
    borderRadius: 14,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: '#bb879e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});