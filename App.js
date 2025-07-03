import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootSiblingParent } from 'react-native-root-siblings';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';

import { CartProvider } from './CartContext';
import { FavoriteProvider } from './FavoriteContext';

import PurchaseScreen from './screens/PurchaseScreen';
import CustomDesignScreen from './screens/CustomDesignScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <HomeStack.Screen name="CustomDesign" component={CustomDesignScreen} />
    </HomeStack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartMain" component={CartScreen} />
      <CartStack.Screen name="Purchase" component={PurchaseScreen} />
    </CartStack.Navigator>
  );
}

// Custom Tab Button bileşeni
function CustomTabButton({ animateButton, scaleAnim }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.customTabButton}
      onPress={() => {
        animateButton();
        navigation.navigate('Anasayfa', { screen: 'CustomDesign' });
      }}
    >
      <Animated.View style={[styles.plusIconWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <Ionicons name="add" size={36} color="#fff" />
      </Animated.View>
    </TouchableOpacity>
  );
}

function MainTabs({ setIsLoggedIn }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Anasayfa') iconName = 'home-outline';
          else if (route.name === 'Favoriler') iconName = 'heart-outline';
          else if (route.name === 'Sepet') iconName = 'cart-outline';
          else if (route.name === 'Profil') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#bb879e',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Anasayfa" component={HomeStackScreen} />
      <Tab.Screen name="Favoriler" component={FavoritesScreen} />

      <Tab.Screen
        name="CustomDesignButton"
        component={() => null}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              animateButton={animateButton}
              scaleAnim={scaleAnim}
            />
          ),
          tabBarLabel: '',
        }}
      />

      <Tab.Screen name="Sepet" component={CartStackScreen} />
      <Tab.Screen
        name="Profil"
        children={(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  customTabButton: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#bb879e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#bb879e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
});

let setIsLoggedInGlobal;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  setIsLoggedInGlobal = setIsLoggedIn;

  return (
    <RootSiblingParent>
      <FavoriteProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'fade',
              }}
            >
              {!isLoggedIn ? (
                <>
                  <Stack.Screen name="Login" component={LoginWrapper} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                </>
              ) : (
                <Stack.Screen
                  name="MainTabs"
                  children={(props) => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </FavoriteProvider>
    </RootSiblingParent>
  );
}

function LoginWrapper({ navigation }) {
  return (
    <LoginScreen
      navigation={navigation}
      onLoginSuccess={() => setIsLoggedInGlobal(true)}
    />
  );
}