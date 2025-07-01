import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

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
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DOĞAL TAŞ KOLEKSİYONU</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
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
});