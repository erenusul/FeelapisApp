import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { CartContext } from '../CartContext';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    Toast.show('Sepete eklendi!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      backgroundColor: '#FF8A00',
      textColor: '#fff',
      position: 100,
      shadow: true,
      animation: true,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} />

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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: '#f3e3eb', // Açık renk olarak güncellendi
  },
  image: {
    width: '100%',
    height: 320,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#bb879e', // Mürdüm tonuna güncellenebilir
  },
  price: {
    fontSize: 20,
    color: '#bb879e', // Turuncu kalabilir ya da '#bb879e' yapılabilir
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
    backgroundColor: '#bb879e', // Turuncu kalabilir ya da '#bb879e' yapılabilir
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});