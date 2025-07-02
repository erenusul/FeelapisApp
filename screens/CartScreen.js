import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const renderItem = ({ item }) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Purchase', { product: item })}
      >
        <Image
          source={
            item.isCustomDesign
              ? require('../assets/kisiseltasarim.png')
              : item.image
          }
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>

          {/* Özel tasarım ürünü ise taşlar ve ip bilgisini göster */}
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

          <Text style={styles.price}>₺{price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepetim</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Sepetiniz şu anda boş.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6ED',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
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
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    marginTop: 4,
    color: '#FF8A00',
    fontWeight: '600',
  },
  deleteBtn: {
    padding: 4,
  },
});