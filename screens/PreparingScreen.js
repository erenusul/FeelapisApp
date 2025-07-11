import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

export default function PreparingScreen({ route, navigation }) {
  const { purchasedItems = [] } = route.params || {};

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={typeof item.images[0] === 'number' ? item.images[0] : { uri: item.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Durum: Hazırlanıyor</Text>
        <Text style={styles.price}>₺{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hazırlananlar</Text>

      {purchasedItems.length === 0 ? (
        <Text style={styles.empty}>Şu anda hazırlanan ürün bulunmamaktadır.</Text>
      ) : (
        <FlatList
          data={purchasedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Anasayfa')}>
        <Text style={styles.buttonText}>Anasayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#bb879e',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#bb879e',
  },
  status: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#bb879e',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#bb879e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});