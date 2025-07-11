import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Animated,
  ScrollView,
} from 'react-native';
import { FavoriteContext } from '../FavoriteContext';
import { CartContext } from '../CartContext';
import AnimatedHeart from '../components/AnimatedHeart';

const products = [
  {
    id: '1',
    name: 'Akuamarin Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/akuamarinbileklik.png', 'http://192.168.1.95:5076/images/akuamarinbileklik2.png'],
    category: 'Bileklik',
  },
  {
    id: '2',
    name: 'Akuamarin Kırma Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/akuamarinkirmabileklik.png', 'http://192.168.1.95:5076/images/akuamarinbileklik2.png'],
    category: 'Bileklik',
  },
  {
    id: '3',
    name: 'Ametist Klips Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/ametistklipsbileklik.png', 'http://192.168.1.95:5076/images/ametistklipsbileklik.png'],
    category: 'Bileklik',
  },
  {
    id: '4',
    name: 'Ametist Lastik Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/ametistlastikbileklik.png', 'http://192.168.1.95:5076/images/ametistlastikbileklik.png'],
    category: 'Bileklik',
  },
  {
    id: '5',
    name: 'Aventurin Kırma Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/aventurinkirmabileklik.png', 'http://192.168.1.95:5076/images/aventurinkirmabileklik.png'],
    category: 'Bileklik',
  },
  {
    id: '6',
    name: 'Gül Kuvars Bileklik Kolye',
    price: '600,00 ₺',
    images: ['http://192.168.1.95:5076/images/gulkuvarsbileklik.png', 'http://192.168.1.95:5076/images/gulkuvarsbileklik2.png'],
    category: 'Bileklik',
  },
  {
    id: '7',
    name: 'Gül Kuvars Kırma Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/gulkuvarskirmabileklik.png', 'http://192.168.1.95:5076/images/gulkuvarskirmabileklik2.png'],
    category: 'Bileklik',
  },
  {
    id: '8',
    name: 'Kedi Gözü Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/kedigozubileklik.png', 'http://192.168.1.95:5076/images/kedigozubileklik2.png'],
    category: 'Bileklik',
  },
  {
    id: '9',
    name: 'Lapis Lazuli Kırma Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/lapislazulikirmabileklik.png', 'http://192.168.1.95:5076/images/lapislazulikirmabileklik2.png'],
    category: 'Bileklik',
  },
  {
    id: '10',
    name: 'Malakit Kırma Bileklik',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/malakitkirmabileklik.png', 'http://192.168.1.95:5076/images/malakitkirmabileklik.png'],
    category: 'Bileklik',
  },
  {
    id: '11',
    name: 'Malakit Kırma Kolye',
    price: '600,00 ₺',
    images: ['http://192.168.1.95:5076/images/malakitkirmakolye.png', 'http://192.168.1.95:5076/images/malakitkirmakolye.png'],
    category: 'Kolye',
  },
  {
    id: '12',
    name: 'Sodalit Kırma Kolye',
    price: '500,00 ₺',
    images: ['http://192.168.1.95:5076/images/sodalitkirmakolye.png', 'http://192.168.1.95:5076/images/sodalitkirmakolye.png'],
    category: 'Kolye',
  },

  
];

const categories = ['Tümü', 'Kolye', 'Bileklik', 'İpler', 'Altın Süsler'];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const ImageCarousel = ({ images }) => {
  return (
    <View style={styles.imageContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ borderRadius: 12 }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }} // ← burası önemli
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { addToCart } = useContext(CartContext);

  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const [toastMessage, setToastMessage] = useState('');
  const toastAnim = useRef(new Animated.Value(-60)).current;

  const showToast = (message) => {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnim, {
        toValue: -60,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const paddingTop = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });
  const logoOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const titleMarginTop = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [15, 5],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchText.trim() !== '') {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchText]);

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast('Ürün sepete eklendi!');
  };

  const renderItem = ({ item }) => {
    const isFavorited = favorites.some(fav => fav.id === item.id);
    return (
      <View style={styles.card}>
        <ImageCarousel images={item.images} />

        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={styles.favoriteIcon}
        >
          <AnimatedHeart active={isFavorited} onPress={() => toggleFavorite(item)} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartIcon}
        >
          <Text style={styles.addToCartText}>Sepete Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
          activeOpacity={0.8}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        item === selectedCategory && styles.categoryButtonSelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          item === selectedCategory && styles.categoryButtonTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.container, { paddingTop }]}>
      <Animated.View style={[styles.toastContainer, { transform: [{ translateY: toastAnim }] }]}>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </Animated.View>

      <Animated.View style={[styles.logoWrapper, { opacity: logoOpacity }]}>
        <Image
          source={require('../assets/logoson1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.titleWrapper, { marginTop: titleMarginTop }]} />

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={renderCategoryItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Ürün ara..."
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
      />

      <Animated.FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: CARD_MARGIN }}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: CARD_MARGIN }}
        ListEmptyComponent={<Text style={styles.noResultsText}>Ürün bulunamadı.</Text>}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f8',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: -85,
    marginTop: -40,
    marginRight: 20,
  },
  logo: {
    width: 300,
    height: 200,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryContainer: {
    height: 35,
    marginTop: 10,
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#bb879e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#bb879e',
  },
  categoryButtonText: {
    color: '#bb879e',
    fontWeight: '600',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  searchInput: {
    marginHorizontal: CARD_MARGIN,
    marginBottom: 10,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 30,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    position: 'relative',
  },
  imageContainer: {
    width: CARD_WIDTH - 24,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH - 24,
    height: 100,
    borderRadius: 12,
    
  },
  name: {
    marginTop: 8,
    fontWeight: '500',
    color: '#000',
  },
  price: {
    marginTop: 4,
    color: '#bb879e',
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
    elevation: 2,
  },
  addToCartIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#bb879e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
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