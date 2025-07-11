import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { CartContext } from '../CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  const [reviews, setReviews] = useState(product.reviews || []);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddToCart = () => {
    addToCart(product);
    Toast.show('Sepete eklendi!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      backgroundColor: '#bb879e',
      textColor: '#fff',
      position: 100,
      shadow: true,
      animation: true,
    });
  };

  const addReview = () => {
    if (!username.trim() || !comment.trim()) {
      alert('Lütfen kullanıcı adı ve yorum girin.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      username,
      rating,
      comment,
    };

    setReviews([...reviews, newReview]);
    setUsername('');
    setComment('');
    setRating(5);
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewUsername}>
        {item.username} ({item.rating} ⭐)
      </Text>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Görsel Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carouselContainer}
      >
        {product.images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }} 
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>

        <Text style={styles.description}>
          Bu zarif {product.name.toLowerCase()}, doğal taşlardan özenle üretilmiştir.
          Ruhunuzu dengeleyecek enerjisiyle şıklığınızı tamamlar.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Sepete Ekle</Text>
        </TouchableOpacity>

        {/* Yorumlar Bölümü */}
        <Text style={styles.sectionTitle}>Kullanıcı Yorumları</Text>

        {reviews.length === 0 ? (
          <Text style={styles.noReviewsText}>Henüz yorum yok.</Text>
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
            scrollEnabled={false}
            style={{ maxHeight: 200, marginBottom: 20 }}
          />
        )}

        {/* Yorum Ekleme Formu */}
        <Text style={styles.sectionTitle}>Yorum Ekle</Text>
        <TextInput
          placeholder="Kullanıcı adı"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Yorumunuz"
          value={comment}
          onChangeText={setComment}
          multiline
          style={[styles.input, { height: 80 }]}
        />
        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>Puan: {rating}</Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity
              style={styles.ratingBtn}
              onPress={() => rating < 5 && setRating(rating + 1)}
            >
              <Text style={styles.ratingBtnText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ratingBtn}
              onPress={() => rating > 1 && setRating(rating - 1)}
            >
              <Text style={styles.ratingBtnText}>−</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={addReview}>
          <Text style={styles.submitButtonText}>Yorumu Gönder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: '#fff5f8',
  },
  carouselContainer: {
    width: '100%',
    height: 320,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 320,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#bb879e',
  },
  price: {
    fontSize: 20,
    color: '#bb879e',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#bb879e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 12,
    color: '#bb879e',
  },
  noReviewsText: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 20,
  },
  reviewItem: {
    marginBottom: 14,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },
  reviewUsername: {
    fontWeight: '700',
    marginBottom: 6,
    color: '#bb879e',
  },
  reviewComment: {
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bb879e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#bb879e',
  },
  ratingButtons: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
  },
  ratingBtn: {
    backgroundColor: '#bb879e',
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#bb879e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  ratingBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 24,
  },
  submitButton: {
    backgroundColor: '#bb879e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});