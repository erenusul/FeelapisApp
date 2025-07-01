import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const DUMMY_EMAIL = 'erenusul@gmail.com';
  const DUMMY_PASSWORD = '123';

  const handleLogin = () => {
    if (email !== DUMMY_EMAIL && password !== DUMMY_PASSWORD) {
      setError('Kullanıcı adı ve şifre hatalı!');
    } else if (email !== DUMMY_EMAIL) {
      setError('Kullanıcı adı hatalı!');
    } else if (password !== DUMMY_PASSWORD) {
      setError('Kullanıcı adınız doğru ama şifrenizi unuttunuz sanırım.');
    } else {
      setError('');
      onLoginSuccess();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/giris.png')}
      style={styles.background}
      blurRadius={5}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>Hoş Geldiniz</Text>

        <TextInput
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#ccc"
        />

        {error !== '' && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Doğal taşlarla zarif takılar</Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 40,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    paddingHorizontal: 16,
    color: '#fff',
  },
 errorText: {
  backgroundColor: 'rgba(255, 77, 77, 0.85)', // 🔴 Belirgin kırmızı kutu
  color: '#fff',
  fontWeight: '600',
  fontSize: 14,
  marginBottom: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 8,
  textAlign: 'center',
},
  button: {
    backgroundColor: '#FF8A00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#eee',
    fontStyle: 'italic',
  },
});