import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const [searchText, setSearchText] = useState('');
  const [filteredCartItems, setFilteredCartItems] = useState(cartItems);

  const totalPrice = filteredCartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredCartItems(cartItems);
    } else {
      const filtered = cartItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCartItems(filtered);
    }
  }, [searchText, cartItems]);

  const handleBuyAll = () => {
    if (cartItems.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }
    navigation.navigate('PaymentMethods', {
      products: cartItems,
      quantity: cartItems.length,
      removeFromCartAll: true,
    });
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      alert('Sepet zaten boş.');
      return;
    }
    Alert.alert(
      "Sepeti Boşalt",
      "Tüm ürünleri sepetten çıkarmak istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Evet", onPress: () => clearCart() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Ürün ara..."
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
      />

      <Text style={styles.title}>Sepetim</Text>

      {filteredCartItems.length === 0 ? (
        <Text style={styles.emptyText}>Sepetiniz şu anda boş.</Text>
      ) : (
        <>
          <FlatList
            data={filteredCartItems}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => {
              const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
              const quantity = item.quantity || 1;
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => navigation.navigate('Purchase', { product: item })}
                >
                  <Image
                    source={
                      item.isCustomDesign
                        ? require('../assets/kisiseltasarim.png')
                        : { uri: item.images[0] } 
                    }
                    style={styles.image}
                  />
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>

                    {item.isCustomDesign && item.stones && item.thread ? (
                      <>
                        <Text style={styles.details}>
                          Taşlar: {item.stones.map(s => s.name).join(', ')}
                        </Text>
                        <Text style={styles.details}>
                          İp: {item.thread.name}
                        </Text>
                      </>
                    ) : null}

                    <Text style={styles.price}>
                      ₺{(price * quantity).toFixed(2)} {quantity > 1 ? `(${quantity} adet)` : ''}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
                    <Ionicons name="trash-outline" size={24} color="#bb879e" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingBottom: 40 }}
          />

          <TouchableOpacity style={styles.buyAllButton} onPress={handleBuyAll}>
            <Text style={styles.buyAllText}>
              Tüm Sepeti Satın Al (₺{totalPrice.toFixed(2)})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
            <Text style={styles.clearCartText}>Tüm Sepeti Boşalt</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f8',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    color: '#bb879e',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    marginTop: 4,
    color: '#bb879e',
    fontWeight: '600',
  },
  deleteBtn: {
    padding: 4,
  },
  buyAllButton: {
    backgroundColor: '#bb879e',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buyAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  clearCartButton: {
    backgroundColor: '#e94b4b',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  clearCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});