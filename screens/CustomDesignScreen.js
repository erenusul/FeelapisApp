import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import { CartContext } from '../CartContext';
import { FavoriteContext } from '../FavoriteContext'; 

const stones = [
    { id: '1', name: 'Yeşim Taşı', image: require('../assets/yesimyapay.png'), price: 100 },
    { id: '2', name: 'Akuamarin', image: require('../assets/akuamarinyapay.png'), price: 150 },
    { id: '3', name: 'Ametist', image: require('../assets/ametistyapay.png'), price: 120 },
    { id: '4', name: 'Lapis Lazuli', image: require('../assets/lapisyapay.png'), price: 130 },
    { id: '5', name: 'Obsidyen', image: require('../assets/obsidyenyapay.png'), price: 110 },
    { id: '6', name: 'Tanzanit', image: require('../assets/tanzanityapay.png'), price: 100 },
    { id: '7', name: 'Gül Kuvars', image: require('../assets/gulkuvarsyapay.png'), price: 100 },
    { id: '8', name: 'Çilek Kuvars', image: require('../assets/cilekkuvarsyapay.png'), price: 150 },
    { id: '9', name: 'Howlit', image: require('../assets/howlityapay.png'), price: 120 },
    { id: '10', name: 'Kaplan Gözü', image: require('../assets/kaplangozuyapay.png'), price: 110 },
    { id: '11', name: 'Kedi Gözü', image: require('../assets/kedigozukuvarsyapay.png'), price: 100 },
    { id: '12', name: 'Kırımız Firuze Taşı', image: require('../assets/kirmizifiruzeyapay.png'), price: 100 },
    { id: '13', name: 'Lavanta Kuvars', image: require('../assets/lavantakuvarsyapay.png'), price: 150 },
    { id: '14', name: 'Malakit', image: require('../assets/malakityapay.png'), price: 120 },
    { id: '15', name: 'Opal', image: require('../assets/opalyapay.png'), price: 130 },
    { id: '16', name: 'Sitrin', image: require('../assets/sitrinyapay.png'), price: 110 },
    { id: '17', name: 'Sodalit', image: require('../assets/sodalityapay.png'), price: 100 },
    { id: '18', name: 'Turkuaz', image: require('../assets/turkuazyapay.png'), price: 110 },
    { id: '19', name: 'Turmalin', image: require('../assets/turmalinyapay.png'), price: 100 },
    { id: '20', name: 'Yeşil Aventurin', image: require('../assets/yesilaventurinyapay.png'), price: 100 },
];

const threads = [
    { id: '1', name: 'Normal İp', price: 20 },
    { id: '2', name: 'Örgü İp', price: 25 },
    { id: '3', name: 'Naylon İp', price: 15 },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export default function CustomDesignScreen() {
    const [selectedStones, setSelectedStones] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const { addToCart } = useContext(CartContext);
    const { favorites, toggleFavorite } = useContext(FavoriteContext);

    const toggleStone = (id) => {
        if (selectedStones.includes(id)) {
            setSelectedStones(selectedStones.filter((sid) => sid !== id));
        } else {
            setSelectedStones([...selectedStones, id]);
        }
    };

    const totalPrice =
        selectedStones.reduce((sum, id) => {
            const stone = stones.find(s => s.id === id);
            return sum + (stone ? stone.price : 0);
        }, 0) + (selectedThread ? threads.find(t => t.id === selectedThread)?.price || 0 : 0);

    const handleAddToCart = () => {
        if (selectedStones.length === 0) {
            alert('Lütfen en az bir taş seçin.');
            return;
        }
        if (!selectedThread) {
            alert('Lütfen bir ip çeşidi seçin.');
            return;
        }

        const selectedStoneObjects = stones.filter(s => selectedStones.includes(s.id));
        const threadObject = threads.find(t => t.id === selectedThread);

        const customProduct = {
            id: `custom_${Date.now()}`,
            name: 'Özel Tasarım Takı',
            stones: selectedStoneObjects,
            thread: threadObject,
            price: Number(totalPrice),
            isCustomDesign: true,
            image: require('../assets/kisiseltasarim.png'),
            selectedStones: selectedStoneObjects.map(s => s.name), // ← TAŞLAR İÇİN GEREKEN SATIR
        };

        addToCart(customProduct);
        alert(`Ürün sepete eklendi!\nToplam fiyat: ₺${totalPrice}`);

        setSelectedStones([]);
        setSelectedThread(null);
    };

    const handleAddToFavorites = () => {
        if (selectedStones.length === 0) {
            alert('Lütfen en az bir taş seçin.');
            return;
        }
        if (!selectedThread) {
            alert('Lütfen bir ip çeşidi seçin.');
            return;
        }

        const selectedStoneObjects = stones.filter(s => selectedStones.includes(s.id));
        const threadObject = threads.find(t => t.id === selectedThread);

        const customProduct = {
            id: `custom_${Date.now()}`,
            name: 'Özel Tasarım Takı',
            stones: selectedStoneObjects,
            thread: threadObject,
            price: Number(totalPrice),
            isCustomDesign: true,
            image: require('../assets/kisiseltasarim.png'),
            selectedStones: selectedStoneObjects.map(s => s.name),
        };

        toggleFavorite(customProduct);
        alert('Ürün favorilere eklendi!');

        setSelectedStones([]);
        setSelectedThread(null);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.header}>Taş Seçin</Text>
                <View style={styles.underline} />
            </View>
            <FlatList
                data={stones}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const isSelected = selectedStones.includes(item.id);
                    return (
                        <TouchableOpacity
                            style={[styles.card, isSelected && styles.cardSelected]}
                            onPress={() => toggleStone(item.id)}
                        >
                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                }}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: CARD_MARGIN }}
            />

            <View style={styles.titleWrapper}>
                <Text style={styles.header}>İp Çeşidi Seçin</Text>
                <View style={styles.underline} />
            </View>
            <View style={styles.threadContainer}>
                {threads.map((thread) => {
                    const isSelected = selectedThread === thread.id;
                    return (
                        <TouchableOpacity
                            key={thread.id}
                            style={[styles.threadBox, isSelected && styles.threadBoxSelected]}
                            onPress={() => setSelectedThread(thread.id)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.threadText, isSelected && styles.threadTextSelected]}>
                                {thread.name}
                            </Text>
                            {isSelected && <Text style={styles.checkMark}>✓</Text>}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Text style={styles.totalPrice}>Toplam Fiyat: ₺{totalPrice}</Text>

            <TouchableOpacity style={styles.saveButton} onPress={handleAddToCart}>
                <Text style={styles.saveButtonText}>Sepete Ekle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.favoriteButton} onPress={handleAddToFavorites}>
                <Text style={styles.saveButtonText}>Favorilere Ekle</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff5f8', paddingTop: 30 },
    titleWrapper: {
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 50,
        width: '100%',
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        color: '#bb879e',
        marginBottom: 8,
        textAlign: 'center',
    },
    underline: {
        height: 2,
        width: '70%',
        borderBottomWidth: 2,
        borderBottomColor: '#bb879e',
        borderRadius: 1,
        alignSelf: 'center',
        marginTop: 4,
    },
    card: {
        width: CARD_WIDTH,
        borderWidth: 0,
        borderColor: '#f3e3eb',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    cardSelected: {
        backgroundColor: '#b5939a',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
    threadContainer: {
        marginBottom: 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    threadBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: '#f3e3eb',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        minWidth: 120,
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    threadBoxSelected: {
        backgroundColor: '#bb879e',
        shadowColor: '#bb879e',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    threadText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#bb879e',
    },
    threadTextSelected: {
        color: '#fff',
    },
    checkMark: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 10,
        fontWeight: '900',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#bb879e',
        textAlign: 'center',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#bb879e',
        marginHorizontal: 30,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 15,
    },
    favoriteButton: {
        backgroundColor: '#bb879e',
        marginHorizontal: 30,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 50,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },
});