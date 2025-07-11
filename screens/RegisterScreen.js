import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');

  const formatDate = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = '';
    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    } else {
      formatted =
        cleaned.slice(0, 2) +
        '/' +
        cleaned.slice(2, 4) +
        '/' +
        cleaned.slice(4, 8);
    }

    return formatted;
  };

  const handleRegister = () => {
    // Basit örnek: Giriş ekranına dön
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        placeholder="Kullanıcı adı"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Doğum Tarihi (GG/AA/YYYY)"
        value={birthdate}
        onChangeText={(text) => setBirthdate(formatDate(text))}
        maxLength={10}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kaydol</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginLink}>Zaten hesabınız var mı? Giriş yap</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#bb879e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginLink: {
    color: '#bb879e',
    textAlign: 'center',
    fontWeight: '500',
  },
});