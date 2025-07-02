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
  Image,
} from 'react-native';

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const DUMMY_USERNAME = 'erenusul';
  const DUMMY_PASSWORD = '123';

  const handleLogin = () => {
    if (username !== DUMMY_USERNAME || password !== DUMMY_PASSWORD) {
      setError('Kullanıcı adı veya şifre hatalı!');
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
        {/* Logo Eklendi */}
        <Image
          source={require('../assets/logoson1.png')}  // Burada logo dosyanın adı olabilir
          style={styles.logo}
        />

        <Text style={styles.title}>Hoş Geldiniz</Text>

        <TextInput
          placeholder="Kullanıcı adı"
          value={username}
          onChangeText={setUsername}
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

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Hesabınız yok mu? Kayıt olun</Text>
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

  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: -10,
  },

  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 40,
    fontWeight: '600',
    textAlign: 'left',
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
    backgroundColor: 'rgba(255, 77, 77, 0.85)',
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
  registerLink: {
    color: '#fff',
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  footerText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#eee',
    fontStyle: 'italic',
  },
});