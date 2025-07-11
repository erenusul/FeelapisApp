const BASE_URL = 'http://192.168.1.95:5076/api';

// Ürünleri Getir
export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Veri alınamadı');
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('Beklenmeyen veri formatı:', data);
      return [];
    }

    const mappedData = data.map(product => ({
      id: product.Id,
      name: product.Name,
      price: product.Price,
      category: product.Category,
      createdAt: product.CreatedAt,
      images: (product.images || []).map(filename =>
        filename.startsWith('http')
          ? filename.replace('0.0.0.0', '192.168.1.95')
          : `${BASE_URL.replace('/api', '')}/images/${filename}`
      )
    }));

    return mappedData;
  } catch (error) {
    console.error('Ürün çekme hatası:', error);
    throw error;
  }
};

// Ürün Ekle
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data || 'Ürün ekleme başarısız');
    return data;
  } catch (error) {
    throw error;
  }
};

// Ürün Güncelle
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data || 'Güncelleme başarısız');
    return data;
  } catch (error) {
    throw error;
  }
};

// Ürün Sil
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Silme işlemi başarısız');
    }
  } catch (error) {
    throw error;
  }
};