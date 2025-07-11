import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const paymentCards = [
  {
    id: '1',
    name: 'Visa **** 1234',
    icon: <FontAwesome5 name="cc-visa" size={24} color="#1A1F71" />,
    cardNumber: '**** **** **** 1234',
  },
  {
    id: '2',
    name: 'MasterCard **** 5678',
    icon: <FontAwesome5 name="cc-mastercard" size={24} color="#EB001B" />,
    cardNumber: '**** **** **** 5678',
  },
  {
    id: '3',
    name: 'American Express **** 9012',
    icon: <FontAwesome5 name="cc-amex" size={24} color="#2E77BB" />,
    cardNumber: '**** ****** *9012',
  },
  {
    id: '4',
    name: 'Kapıda Ödeme',
    icon: <MaterialCommunityIcons name="cash" size={24} color="#4CAF50" />,
  },
];

const discountCodes = {
  SAVE10: 10,
  SAVE20: 20,
  VIP50: 50,
};

export default function PaymentMethodsScreen({ route, navigation }) {
  const { product = { price: '0' }, quantity = 1, removeFromCart } = route.params || {};
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const applyDiscountCode = () => {
    const code = discountCode.trim().toUpperCase();
    if (discountCodes[code]) {
      setDiscountPercent(discountCodes[code]);
      Alert.alert('Başarılı', `%${discountCodes[code]} indirim uygulandı!`);
    } else {
      setDiscountPercent(0);
      Alert.alert('Hata', 'Geçersiz indirim kodu.');
    }
  };

  const cleanedPrice = (product.price || '0').toString().replace(/[₺\s]/g, '').replace(',', '.');
  const safePrice = parseFloat(cleanedPrice) || 0;
  const safeQuantity = Number(quantity) || 0;
  const totalPrice = safePrice * safeQuantity;
  const discountedPrice = totalPrice * (1 - discountPercent / 100);

  const validateForm = () => {
    if (!selectedCardId) return Alert.alert('Uyarı', 'Lütfen bir ödeme yöntemi seçin.');
    if (selectedCardId === '4') {
      if (!address.trim()) return Alert.alert('Uyarı', 'Lütfen teslimat adresinizi girin.');
      if (!phone.trim()) return Alert.alert('Uyarı', 'Lütfen telefon numaranızı girin.');
    } else {
      if (!cardHolderName.trim()) return Alert.alert('Uyarı', 'Lütfen kart üzerindeki adı girin.');
      if (!expiryDate.trim()) return Alert.alert('Uyarı', 'Lütfen kart son kullanma tarihini girin.');
      if (!cvv.trim() || cvv.length < 3) return Alert.alert('Uyarı', 'Lütfen geçerli bir CVV girin.');
      if (!address.trim()) return Alert.alert('Uyarı', 'Lütfen teslimat adresinizi girin.');
      if (!phone.trim()) return Alert.alert('Uyarı', 'Lütfen telefon numaranızı girin.');
      if (billingDifferent && !billingAddress.trim()) return Alert.alert('Uyarı', 'Lütfen fatura adresinizi girin.');
    }
    return true;
  };

  const handlePayment = () => {
    if (!validateForm()) return;
    Alert.alert('Bilgi', selectedCardId === '4' ? `Kapıda ödeme seçildi.\nAdres: ${address}\nTelefon: ${phone}\nToplam: ₺${discountedPrice.toFixed(2)}\nSiparişiniz kaydedildi!` : `Ödeme işlemi başarılı! Toplam: ₺${discountedPrice.toFixed(2)}\nTeşekkürler.`);
    if (product && removeFromCart) removeFromCart(product.id);
    navigation.popToTop();
  };

  const renderCardItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.cardItem, selectedCardId === item.id && styles.cardSelected]}
      onPress={() => setSelectedCardId(item.id)}
    >
      <View style={styles.iconWrapper}>{item.icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardName}>{item.name}</Text>
        {item.cardNumber && <Text style={styles.cardNumber}>{item.cardNumber}</Text>}
      </View>
      {selectedCardId === item.id && (
        <MaterialCommunityIcons name="check-circle" size={24} color="#bb879e" style={{ marginLeft: 'auto' }} />
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>Ödeme Yöntemleri</Text>

        <FlatList
          data={paymentCards}
          keyExtractor={(item) => item.id}
          renderItem={renderCardItem}
          contentContainerStyle={{ paddingVertical: 20 }}
          scrollEnabled={false}
        />

        {selectedCardId && (
          <>
            {selectedCardId === '4' ? (
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Teslimat Adresi</Text>
                <TextInput style={styles.input} placeholder="Adresinizi girin" value={address} onChangeText={setAddress} multiline />
                <Text style={styles.formLabel}>Telefon Numarası</Text>
                <TextInput style={styles.input} placeholder="Telefon numaranızı girin" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
              </View>
            ) : (
              <>
                <View style={styles.formContainer}>
                  <Text style={styles.formLabel}>Kart Üzerindeki İsim</Text>
                  <TextInput style={styles.input} placeholder="Ad Soyad" value={cardHolderName} onChangeText={setCardHolderName} />
                  <Text style={styles.formLabel}>Son Kullanma Tarihi (AA/YY)</Text>
                  <TextInput style={styles.input} placeholder="MM/YY" value={expiryDate} onChangeText={setExpiryDate} maxLength={5} keyboardType="numeric" />
                  <Text style={styles.formLabel}>CVV</Text>
                  <TextInput style={styles.input} placeholder="XXX" value={cvv} onChangeText={setCvv} maxLength={4} keyboardType="numeric" secureTextEntry />
                </View>

                <View style={styles.billingContainer}>
                  <TouchableOpacity onPress={() => setBillingDifferent(!billingDifferent)} style={styles.checkboxContainer}>
                    <View style={[styles.checkbox, billingDifferent && styles.checkboxChecked]} />
                    <Text style={styles.checkboxLabel}>Fatura adresi teslimat adresinden farklı</Text>
                  </TouchableOpacity>
                  {billingDifferent && (
                    <TextInput
                      style={[styles.input, { marginTop: 10 }]}
                      placeholder="Fatura adresinizi girin"
                      value={billingAddress}
                      onChangeText={setBillingAddress}
                      multiline
                    />
                  )}
                </View>

                <View style={styles.formContainer}>
                  <Text style={styles.formLabel}>Teslimat Adresi</Text>
                  <TextInput style={styles.input} placeholder="Adresinizi girin" value={address} onChangeText={setAddress} multiline />
                  <Text style={styles.formLabel}>Telefon Numarası</Text>
                  <TextInput style={styles.input} placeholder="Telefon numaranızı girin" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                </View>
              </>
            )}

            <View style={styles.discountContainer}>
              <TextInput style={styles.discountInput} placeholder="İndirim kodu girin" value={discountCode} onChangeText={setDiscountCode} autoCapitalize="characters" />
              <TouchableOpacity style={styles.applyButton} onPress={applyDiscountCode}>
                <Text style={styles.applyButtonText}>Uygula</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceContainer}>
              {discountPercent > 0 ? (
                <>
                  <Text style={styles.originalPrice}>₺{totalPrice.toFixed(2)}</Text>
                  <Text style={styles.discountedPrice}>₺{discountedPrice.toFixed(2)}</Text>
                </>
              ) : (
                <Text style={styles.discountedPrice}>₺{totalPrice.toFixed(2)}</Text>
              )}
            </View>
          </>
        )}

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <View style={styles.payButtonContent}>
            {discountPercent > 0 ? (
              <>
                <Text style={styles.originalPrice}>₺{totalPrice.toFixed(2)}</Text>
                <Text style={styles.payButtonText}>₺{discountedPrice.toFixed(2)}</Text>
              </>
            ) : (
              <Text style={styles.payButtonText}>₺{totalPrice.toFixed(2)}</Text>
            )}
          </View>
          <Text style={[styles.payButtonText, { marginLeft: 10 }]}>Ödemeyi Tamamla</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff5f8', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#bb879e', marginBottom: 16, marginTop: 50 },
  cardItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 20, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  cardSelected: { borderColor: '#bb879e', backgroundColor: '#f9e9ed' },
  iconWrapper: { width: 40, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardName: { fontSize: 18, color: '#bb879e', fontWeight: '600' },
  cardNumber: { fontSize: 14, color: '#888', marginTop: 4 },
  discountContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#fff', borderRadius: 14, padding: 10, elevation: 4 },
  discountInput: { flex: 1, borderWidth: 1, borderColor: '#bb879e', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, fontSize: 16, color: '#000', backgroundColor: '#fff' },
  applyButton: { marginLeft: 10, backgroundColor: '#bb879e', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  applyButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  priceContainer: { marginBottom: 20, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  originalPrice: { fontSize: 16, color: '#888', textDecorationLine: 'line-through', marginRight: 10 },
  discountedPrice: { fontSize: 18, fontWeight: 'bold', color: '#bb879e' },
  payButton: { backgroundColor: '#bb879e', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginTop: 'auto', shadowColor: '#bb879e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 10, marginBottom: 50, flexDirection: 'row' },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  payButtonContent: { flexDirection: 'row', alignItems: 'center' },
  formContainer: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 20, elevation: 4 },
  formLabel: { fontWeight: '600', color: '#bb879e', marginBottom: 8, fontSize: 16 },
  input: {
    borderWidth: 1, borderColor: '#bb879e', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#fff', color: '#000'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#bb879e',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#fff',
  },

  checkboxChecked: {
    backgroundColor: '#bb879e',
  },

  checkboxLabel: {
    fontSize: 16,
    color: '#bb879e',
    fontWeight: '600',
  },
});