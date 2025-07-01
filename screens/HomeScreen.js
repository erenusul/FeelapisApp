import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoriteContext } from '../FavoriteContext';

const products = [
  {
    id: '1',
    name: 'Yeşim Taşı Kolye',
    price: '₺920,80',
    image: require('../assets/yesim.png'),
  },
  {
    id: '2',
    name: 'Akuamarin Bileklik',
    price: '₺245,50',
    image: require('../assets/akuamarin.png'),
  },
];

export default function HomeScreen({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const renderItem = ({ item }) => {
    const isFavorited = favorites.some((fav) => fav.id === item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <Image source={item.image} style={styles.image} />

        {/* Kalp butonu */}
        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={styles.favoriteIcon}
        >
          <View style={styles.iconWrapper}>
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorited ? '#FF3B30' : '#FF8A00'}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DOĞAL TAŞ KOLEKSİYONU</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6ED',
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 16,
  },
  card: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  name: {
    marginTop: 8,
    fontWeight: '500',
  },
  price: {
    marginTop: 4,
    color: '#FF8A00',
    fontWeight: '600',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});