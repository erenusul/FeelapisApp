import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProducts, deleteProduct } from '../api/productApi';

const AdminPanelScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert('Hata', 'Ürünler alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Silme Onayı',
      'Bu ürünü silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          onPress: async () => {
            try {
              await deleteProduct(id);
              setProducts((prev) => prev.filter((item) => item.id !== id));
              Alert.alert('Başarılı', 'Ürün silindi.');
            } catch (err) {
              Alert.alert('Hata', 'Silme işlemi başarısız.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name || 'Ürün adı yok'}</Text>
      <Text style={styles.price}>
        {item.price ? `₺ ${item.price}` : 'Fiyat belirtilmemiş'}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#bb879e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Paneli</Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={<Text>Hiç ürün yok.</Text>}
      />
    </View>
  );
};

export default AdminPanelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f8',
    padding: 20,
    
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#bb879e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#777',
    marginVertical: 8,
  },
  deleteButton: {
    backgroundColor: '#E94B4B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});