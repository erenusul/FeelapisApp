import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { CartContext } from '../CartContext';
import { FavoriteContext } from '../FavoriteContext';

import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoriteContext);

  const [username, setUsername] = useState('erenusul');
  const [email, setEmail] = useState('erenusul@gmail.com');

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCardModal, setShowCardModal] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [savedCards, setSavedCards] = useState([]);

  const handleChangePassword = () => {
    if (newPassword.length < 4) {
      Alert.alert('Hata', 'Şifre en az 4 karakter olmalı.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }
    Alert.alert('Başarılı', 'Şifre değiştirildi.');
    setShowPasswordModal(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddCard = () => {
    if (!cardName || !cardNumber || !expiryDate) {
      Alert.alert('Hata', 'Lütfen tüm kart bilgilerini doldurun.');
      return;
    }
    setSavedCards((prev) => [
      ...prev,
      { id: Date.now().toString(), cardName, cardNumber, expiryDate },
    ]);
    setShowCardModal(false);
    setCardName('');
    setCardNumber('');
    setExpiryDate('');
  };

  const handleDeleteCard = (id) => {
    Alert.alert(
      'Kart Sil',
      'Bu kartı silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            setSavedCards((prev) => prev.filter((card) => card.id !== id));
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // WhatsApp buton fonksiyonu
  const openWhatsApp = () => {
    const phoneNumber = '+90XXXXXXXXXX'; // Buraya kendi numaranı ekle (ülke kodu dahil)
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Hata', 'WhatsApp yüklü değil veya desteklenmiyor.');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => Alert.alert('Hata', 'Bir hata oluştu: ' + err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.profilePhotoContainer}>
        <Image
          source={require('../assets/Ekran Resmi 2025-07-01 16.31.45.png')}
          style={styles.profilePhoto}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil Bilgileri</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Kullanıcı Adı:</Text>
          <Text style={styles.value}>{username}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>E-posta:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowPasswordModal(true)}
        >
          <Text style={styles.actionButtonText}>Şifre Değiştir</Text>
        </TouchableOpacity>
      </View>

      {/* WhatsApp İletişim Butonu */}
      <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
        <FontAwesome name="whatsapp" size={24} color="white" style={{ marginRight: 10 }} />
        <Text style={styles.whatsappButtonText}>WhatsApp İletişim</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sepet & Favoriler</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Sepetteki Ürün Sayısı:</Text>
          <Text style={styles.value}>{cartItems.length}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Favorilerdeki Ürün Sayısı:</Text>
          <Text style={styles.value}>{favorites.length}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ödeme Kart Bilgileri</Text>

        {savedCards.length === 0 && (
          <Text style={{ marginBottom: 10, color: '#888' }}>Kart eklenmedi</Text>
        )}

        {savedCards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <Text style={styles.cardText}>
              {card.cardName} - {card.cardNumber} (Son: {card.expiryDate})
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCard(card.id)}
            >
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#bb879e' }]}
          onPress={() => setShowCardModal(true)}
        >
          <Text style={[styles.actionButtonText, { color: '#fff' }]}>Kart Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Satın Alma Geçmişi Butonu */}
      <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
        <TouchableOpacity
          style={styles.purchaseHistoryButton}
          onPress={() => navigation.navigate('Anasayfa', { screen: 'PurchaseHistory' })}
        >
          <Text style={styles.purchaseHistoryButtonText}>Satın Alma Geçmişi</Text>
        </TouchableOpacity>
      </View>
      {/* Admin Panel Butonu */}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#6b4f74' }]}
        onPress={() => navigation.navigate('AdminPanel')}
      >
        <Text style={[styles.actionButtonText, { color: '#fff' }]}>Admin Panel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>

      <Modal
        visible={showPasswordModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Şifre Değiştir</Text>

            <TextInput
              placeholder="Yeni Şifre"
              secureTextEntry
              style={styles.modalInput}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              placeholder="Yeni Şifre (Tekrar)"
              secureTextEntry
              style={styles.modalInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#bb879e' }]}
              onPress={handleChangePassword}
            >
              <Text style={[styles.actionButtonText, { color: '#fff' }]}>Kaydet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#ccc', marginTop: 10 }]}
              onPress={() => setShowPasswordModal(false)}
            >
              <Text style={[styles.actionButtonText, { color: '#000' }]}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCardModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCardModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kart Ekle</Text>

            <TextInput
              placeholder="Kart Sahibi Adı"
              style={styles.modalInput}
              value={cardName}
              onChangeText={setCardName}
            />
            <TextInput
              placeholder="Kart Numarası"
              style={styles.modalInput}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              placeholder="Son Kullanma Tarihi (AA/YY)"
              style={styles.modalInput}
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              placeholder="CVV (3 haneli)"
              style={styles.modalInput}
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
            />

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#bb879e' }]}
              onPress={handleAddCard}
            >
              <Text style={[styles.actionButtonText, { color: '#fff' }]}>Kaydet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#ccc', marginTop: 10 }]}
              onPress={() => setShowCardModal(false)}
            >
              <Text style={[styles.actionButtonText, { color: '#000' }]}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff5f8',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ddd',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#bb879e',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  label: {
    color: '#555',
    fontWeight: '600',
    fontSize: 16,
  },
  value: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bb879e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#bb879e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  whatsappButton: {
    flexDirection: 'row',       // Yanyana olması için
    backgroundColor: '#25D366',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  whatsappButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#E94B4B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#bb879e',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#bb879e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  cardItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#E94B4B',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  purchaseHistoryButton: {
    backgroundColor: '#bb879e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  purchaseHistoryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});