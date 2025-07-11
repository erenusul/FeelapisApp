import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

// Doğum tarihi üzerinden burç hesaplama fonksiyonu
const getBurcFromDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Koç';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Boğa';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'İkizler';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Yengeç';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Aslan';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Başak';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Terazi';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Akrep';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Yay';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Oğlak';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Kova';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Balık';
  return null;
};

export default function HoroscopeScreen() {
  const [loading, setLoading] = useState(true);
  const [burcYorumu, setBurcYorumu] = useState(null);

  // Örnek doğum tarihi - bunu kullanıcıdan alacaksın
  const dogumTarihi = '2000-07-06';
  const burc = getBurcFromDate(dogumTarihi);

  useEffect(() => {
    const fetchYorum = async () => {
      try {
        const response = await fetch('http://192.168.1.95:5076/api/horoscope/haftalik');
        const data = await response.json();
        const benimBurc = data.find(item => item.burc.toLowerCase() === burc.toLowerCase());
        setBurcYorumu(benimBurc?.yorum || 'Yorum bulunamadı.');
      } catch (err) {
        setBurcYorumu('Yorum alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchYorum();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{burc} Burcu Haftalık Yorumu</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#bb879e" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.comment}>{burcYorumu}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff5f8',
    flexGrow: 1,
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
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  comment: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});