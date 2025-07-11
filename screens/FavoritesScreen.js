import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import { FavoriteContext } from '../FavoriteContext';
import { CartContext } from '../CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { addToCart } = useContext(CartContext);

  const [toastMessage, setToastMessage] = useState('');
  const toastAnim = React.useRef(new Animated.Value(-60)).current;

  const [searchText, setSearchText] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  const showToast = (message) => {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 60,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredFavorites(favorites);
    } else {
      const filtered = favorites.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredFavorites(filtered);
    }
  }, [searchText, favorites]);

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast('Sepete eklendi!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Görsel kontrolü yapıldı */}
      <Image
        source={
          item.images && item.images.length > 0
            ? { uri: item.images[0] } 
            : require('../assets/kisiseltasarim.png')
        }
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      <TouchableOpacity
        onPress={() => toggleFavorite(item)}
        style={styles.heartButton}
      >
        <Ionicons name="heart" size={20} color="#bb879e" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleAddToCart(item)}
        style={styles.addToCartButton}
      >
        <Text style={styles.addToCartText}>Sepete Ekle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.toastContainer, { transform: [{ translateY: toastAnim }] }]}>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </Animated.View>

      <TextInput
        style={styles.searchInput}
        placeholder="Ürün ara..."
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
      />

      <Text style={styles.title}>Favorilerim</Text>
      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.noResultsText}>Ürün bulunamadı.</Text>}
      />
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
  noResultsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  price: {
    color: '#bb879e',
    marginTop: 4,
    fontWeight: 'bold',
  },
  heartButton: {
    padding: 8,
  },
  addToCartButton: {
    backgroundColor: '#bb879e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginLeft: 10,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '700',
  },
  toastContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(187, 135, 158, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 9999,
    maxWidth: '80%',
    shadowColor: '#bb879e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  toastText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});