import React, { useContext, useState, useEffect, useRef } from 'react';  // useState ve useEffect eklendi
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
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
    name: 'Yeşim Taşı Kolye',
    price: '250,00 ₺',
    image: require('../assets/yesim.png'),
    category: 'Taşlar',
  },
  {
    id: '2',
    name: 'Akuamarin Bileklik',
    price: '245,50 ₺',
    image: require('../assets/akuamarin.png'),
    category: 'Taşlar',
  },
  {
    id: '3',
    name: 'Ametist Bileklik',
    price: '250,00 ₺',
    image: require('../assets/ametist.png'),
    category: 'Taşlar',
  },
  {
    id: '4',
    name: 'Lapis Lazuli Kolye',
    price: '300,00 ₺',
    image: require('../assets/lapis.png'),
    category: 'Taşlar',
  },
  {
    id: '5',
    name: 'Obsidyen Bileklik',
    price: '275,00 ₺',
    image: require('../assets/obsidyen.png'),
    category: 'Taşlar',
  },
  {
    id: '6',
    name: 'Tanzanit Kolye',
    price: '280,00 ₺',
    image: require('../assets/tanzanit.png'),
    category: 'Taşlar',
  },
  {
    id: '7',
    name: 'Gül Kuvars Bileklik',
    price: '250,00 ₺',
    image: require('../assets/gulkuvars.png'),
    category: 'Taşlar',
  },
  {
    id: '8',
    name: 'Çilek Kuvars Bileklik',
    price: '250,00 ₺',
    image: require('../assets/cilekkuvars.png'),
    category: 'Taşlar',
  },
  {
    id: '9',
    name: 'Howlit Kolye',
    price: '300,00 ₺',
    image: require('../assets/howlit.png'),
    category: 'Taşlar',
  },
  {
    id: '10',
    name: 'Kaplan Gözü Bileklik',
    price: '275,00 ₺',
    image: require('../assets/kaplangozu.png'),
    category: 'Taşlar',
  },
  {
    id: '11',
    name: 'Kedi Gözü Kolye',
    price: '280,00 ₺',
    image: require('../assets/kedigozukuvars.png'),
    category: 'Taşlar',
  },
  {
    id: '12',
    name: 'Kırmızı Firuze Kolye',
    price: '300,00 ₺',
    image: require('../assets/kirmizifiruze.png'),
    category: 'Taşlar',
  },
  {
    id: '13',
    name: 'Lavanta Kuvars Bileklik',
    price: '275,00 ₺',
    image: require('../assets/lavantakuvars.png'),
    category: 'Taşlar',
  },
  {
    id: '14',
    name: 'Malakit Kolye',
    price: '280,00 ₺',
    image: require('../assets/malakit.png'),
    category: 'Taşlar',
  },
  {
    id: '15',
    name: 'Opal Kolye',
    price: '280,00 ₺',
    image: require('../assets/opal.png'),
    category: 'Taşlar',
  },
  {
    id: '16',
    name: 'Sitrin Kolye',
    price: '300,00 ₺',
    image: require('../assets/sitrin.png'),
    category: 'Taşlar',
  },
  {
    id: '17',
    name: 'Sodalit Bileklik',
    price: '275,00 ₺',
    image: require('../assets/sodalit.png'),
    category: 'Taşlar',
  },
  {
    id: '18',
    name: 'Turkuaz Kolye',
    price: '280,00 ₺',
    image: require('../assets/turkuaz.png'),
    category: 'Taşlar',
  },
  {
    id: '19',
    name: 'Turmalin Kolye',
    price: '280,00 ₺',
    image: require('../assets/turmalin.png'),
    category: 'Taşlar',
  },
  {
    id: '20',
    name: 'Yeşil Aventurin Kolye',
    price: '300,00 ₺',
    image: require('../assets/yesilaventurin.png'),
    category: 'Taşlar',
  },

  // İpler kategorisi ürünleri
  {
    id: '21',
    name: 'Misina İp',
    price: '20,00 ₺',
    image: require('../assets/misina.png'),
    category: 'İpler',
  },
  {
    id: '22',
    name: 'ALtın Süs',
    price: '25,00 ₺',
    image: require('../assets/altinsus.png'),
    category: 'Altın Süsler',
  },
  
];

const categories = ['Tümü', 'Taşlar', 'İpler', 'Altın Süsler'];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export default function HomeScreen({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { addToCart } = useContext(CartContext);  // Sepete eklemek için

  // Arama için state
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  // Toast state ve animasyon
  const [toastMessage, setToastMessage] = useState('');
  const toastAnim = useRef(new Animated.Value(-60)).current; // Başlangıçta gizli (üstte)

  // Toast gösterme fonksiyonu
  const showToast = (message) => {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000), // 2 saniye görünür kalacak
      Animated.timing(toastAnim, {
        toValue: -60,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Scroll pozisyonunu tutan Animated.Value
  const scrollY = useRef(new Animated.Value(0)).current;

  // Ürünleri kategori ve arama metnine göre filtrele
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

  // Logo opacity animasyonu
  const logoOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Başlık font büyüklüğü animasyonu
  const titleFontSize = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [20, 16],
    extrapolate: 'clamp',
  });

  // Container paddingTop animasyonu
  const paddingTop = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  // Başlık margin animasyonu (yukarı hareket)
  const titleMarginTop = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [15, 5],
    extrapolate: 'clamp',
  });

  // Sepete ekle butonu basılınca toast gösterimiyle birlikte
  const handleAddToCart = (item) => {
    addToCart(item);
    showToast('Ürün sepete eklendi!');
  };

  const renderItem = ({ item }) => {
    const isFavorited = favorites.some((fav) => fav.id === item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <Image source={item.image} style={styles.image} />

        {/* Favorilere Ekle Butonu */}
        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={styles.favoriteIcon}
        >
          <AnimatedHeart active={isFavorited} onPress={() => toggleFavorite(item)} />
        </TouchableOpacity>

        {/* Sepete Ekle Butonu */}
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartIcon}
        >
          <Text style={styles.addToCartText}>Sepete Ekle</Text>
        </TouchableOpacity>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
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
      {/* Toast */}
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

      <Animated.View
        style={[
          styles.titleWrapper,
          { marginTop: titleMarginTop },
        ]}
      >
        {/* Başlık istersen eklenebilir */}
      </Animated.View>

      {/* Kategori seçici */}
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

      {/* Arama Çubuğu */}
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
    backgroundColor: '#fff5f8', // Açık mürdüm
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: -85,
    marginBlockStart: -40,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
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