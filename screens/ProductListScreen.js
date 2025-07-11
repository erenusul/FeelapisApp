import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getProducts } from '../api/productApi'; // doğru yoldan import et

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProducts();
        setProducts(result);
      } catch (error) {
        console.error('Ürünleri çekerken hata:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: 'http://192.168.1.95:5076/images/kedigozubileklik.png' }} 
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: { width: '100%', height: 200, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  price: { fontSize: 16, color: '#666' },
});

export default ProductListScreen;