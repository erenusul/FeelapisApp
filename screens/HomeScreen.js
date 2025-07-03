import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { FavoriteContext } from '../FavoriteContext';
import AnimatedHeart from '../components/AnimatedHeart';

const products = [
  {
    id: '1',
    name: 'Yeşim Taşı Kolye',
    price: '250,00',
    image: require('../assets/yesim.png'),
  },
  {
    id: '2',
    name: 'Akuamarin Bileklik',
    price: '245,50',
    image: require('../assets/akuamarin.png'),
  },
  {
    id: '3',
    name: 'Ametist Bileklik',
    price: '250,00',
    image: require('../assets/ametist.png'),
  },
  {
    id: '4',
    name: 'Lapis Lazuli Kolye',
    price: '300,00',
    image: require('../assets/lapis.png'),
  },
  {
    id: '5',
    name: 'Obsidyen Bileklik',
    price: '275,00',
    image: require('../assets/obsidyen.png'),
  },
  {
    id: '6',
    name: 'Tanzanit Kolye',
    price: '280,00',
    image: require('../assets/tanzanit.png'),
  },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2; // İki kart + marginleri

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
          <AnimatedHeart active={isFavorited} onPress={() => toggleFavorite(item)} />
        </TouchableOpacity>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>DOĞAL TAŞ KOLEKSİYONU</Text>
        <View style={styles.underline} />
      </View>

      {/* Kendi Tasarımını Oluştur Butonu */}
  

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: CARD_MARGIN }}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: CARD_MARGIN }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e4eb',
    paddingTop: 60,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#bb879e',
    marginTop: 15,
    fontFamily: 'Pacifico', // Varsa kalabilir
  },
  underline: {
    height: 2,
    width: '70%',       // Çizginin sağdan soldan kırpılmış genişliği
    backgroundColor: '#bb879e',
    marginTop: 4,
    borderRadius: 1,
  },
  customDesignButton: {
    backgroundColor: '#bb879e',
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  customDesignButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    width: CARD_WIDTH,
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
    color: '#6c5364',
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
});