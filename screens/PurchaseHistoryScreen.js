import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { CartContext } from '../CartContext';

export default function PurchaseHistoryScreen() {
  const { purchaseHistory } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.purchaseItem}>
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <Text style={styles.detailText}>Adet: {item.quantity}</Text>
        <Text style={styles.detailText}>Toplam: ₺{item.totalPrice.toFixed(2)}</Text>
        <Text style={styles.detailText}>Tarih: {new Date(item.purchaseDate).toLocaleString()}</Text>
        <Text style={styles.statusText}>
          Durum:{' '}
          {item.status === 'shipped'
            ? 'Gönderildi 🚚'
            : 'Hazırlanıyor 📦'}
        </Text>

        {/* Eğer özel tasarım ürünü ise taşları göster */}
        {item.product.selectedStones && item.product.selectedStones.length > 0 && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.detailText}>Seçilen Taşlar:</Text>
            {item.product.selectedStones.map((stone, index) => (
              <Text key={index} style={styles.detailText}>• {stone}</Text>
            ))}
          </View>
        )}
      </View>

      <Image
        source={
          item.product.images && item.product.images.length > 0
            ? (typeof item.product.images[0] === 'string'
                ? { uri: item.product.images[0] }
                : item.product.images[0])
            : require('../assets/kisiseltasarim.png') // fallback görsel
        }
        style={styles.productImage}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {purchaseHistory.length === 0 ? (
        <Text style={styles.noPurchases}>Henüz satın alma geçmişiniz yok.</Text>
      ) : (
        <FlatList
          data={purchaseHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 70 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff5f8',
  },
  purchaseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#bb879e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  productName: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8,
    color: '#bb879e',
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#bb879e',
    marginTop: 4,
  },
  noPurchases: {
    marginTop: 80,
    textAlign: 'center',
    fontSize: 16,
    color: '#bbb',
  },
});