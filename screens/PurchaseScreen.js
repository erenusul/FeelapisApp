import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
} from 'react-native';
import { CartContext } from '../CartContext';

export default function PurchaseScreen({ route, navigation }) {
    const { product } = route.params;
    const { removeFromCart } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);
    const [selectedCard, setSelectedCard] = useState(null);

    // Fiyatı temizleyip sayıya çeviriyoruz, NaN ise 0 olur
    const safePrice = (price) => {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            // '₺250,00' → '250.00'
            const cleaned = price.replace(/[^\d,.-]/g, '').replace(',', '.');
            const parsed = parseFloat(cleaned);
            return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
    };

    const price = safePrice(product.price);

    const paymentCards = [
        { id: '1', name: 'Visa **** 1234' },
        { id: '2', name: 'MasterCard **** 5678' },
        { id: '3', name: 'American Express **** 9012' },
    ];

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const handleBuy = () => {
        if (!selectedCard) {
            Alert.alert('Hata', 'Lütfen bir ödeme kartı seçin.');
            return;
        }

        Alert.alert(
            'Başarılı',
            `${product.isCustomDesign ? 'Özel Tasarım Takı' : product.name} ürününden ${quantity} adet satın alındı.\nÖdeme kartı: ${selectedCard.name}`,
            [
                {
                    text: 'Tamam',
                    onPress: () => {
                        removeFromCart(product.id); // Sepetten çıkar
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Satın Alma</Text>
                <Image
                    source={
                        product.isCustomDesign
                            ? require('../assets/kisiseltasarim.png')
                            : product.image
                    }
                    style={styles.productImage}
                />
            </View>

            <Text style={styles.productName}>
                {product.isCustomDesign ? 'Özel Tasarım Takı' : product.name}
            </Text>
            <Text style={styles.productPrice}>₺{price.toFixed(2)}</Text>

            {product.isCustomDesign && product.stones && product.thread && (
                <>
                    <Text style={styles.label}>Seçilen Taşlar:</Text>
                    {product.stones.map((stone, index) => (
                        <Text key={index} style={styles.detailItem}>
                            • {stone.name}
                        </Text>
                    ))}
                    <Text style={styles.label}>Seçilen İp Çeşidi:</Text>
                    <Text>{product.thread.name}</Text>
                </>
            )}

            <View style={styles.section}>
                <Text style={styles.label}>Adet:</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityBtn} onPress={decrementQuantity}>
                        <Text style={styles.quantityBtnText}>-</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.quantityInput}
                        keyboardType="numeric"
                        value={quantity.toString()}
                        onChangeText={text => {
                            const num = parseInt(text);
                            if (!isNaN(num) && num > 0) setQuantity(num);
                        }}
                    />

                    <TouchableOpacity style={styles.quantityBtn} onPress={incrementQuantity}>
                        <Text style={styles.quantityBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Ödeme Kartı Seçin:</Text>
                {paymentCards.map(card => (
                    <TouchableOpacity
                        key={card.id}
                        style={[
                            styles.cardItem,
                            selectedCard?.id === card.id && styles.cardSelected,
                        ]}
                        onPress={() => setSelectedCard(card)}
                    >
                        <Text style={styles.cardText}>{card.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                <Text style={styles.buyButtonText}>Satın Al</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFF9F0' },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF8A00',
        borderBottomColor: '#FF8A00',
        borderBottomWidth: 2,
        paddingBottom: 8,
        marginTop: 50,
    },

    productImage: {
        width: 170,
        height: 170,
        borderRadius: 16,
        marginBottom: 5,
        position: 'absolute',
        top: 70,
        right: 4,
    },

    productName: { fontSize: 22, fontWeight: '600', marginBottom: 6 },
    productPrice: { fontSize: 18, marginBottom: 20, color: '#FF8A00' },

    section: {
        marginTop: 20,
        marginBottom: 10,
    },

    label: { fontWeight: '600', marginBottom: 8 },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityBtn: {
        width: 36,
        height: 36,
        backgroundColor: '#FF8A00',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityBtnText: { fontSize: 24, color: '#fff', fontWeight: '700' },

    quantityInput: {
        borderWidth: 1,
        borderColor: '#FF8A00',
        marginHorizontal: 12,
        borderRadius: 8,
        padding: 8,
        fontSize: 18,
        minWidth: 60,
        textAlign: 'center',
        color: '#000',
    },

    cardItem: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cardSelected: {
        borderColor: '#FF8A00',
        backgroundColor: '#FFF0D9',
    },
    cardText: { fontSize: 16 },

    buyButton: {
        backgroundColor: '#FF8A00',
        marginTop: 40,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#FF8A00',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
    },
    buyButtonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
});