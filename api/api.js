const BASE_URL = 'http://192.168.1.95:5076/api'; // Kendi IP ve port’un neyse onu yaz

// Kullanıcı Kaydı
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data || 'Kayıt başarısız');

    return data;
  } catch (error) {
    throw error;
  }
};