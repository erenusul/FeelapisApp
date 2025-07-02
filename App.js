import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

import FallingStones from './components/FallingStones';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </HomeStack.Navigator>
  );
}

function MainTabs({ setIsLoggedIn }) {
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
        tabBarActiveTintColor: '#FF8A00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Anasayfa" component={HomeStackScreen} />
      <Tab.Screen name="Favoriler" component={FavoritesScreen} />
      <Tab.Screen name="Sepet" component={CartScreen} />
      <Tab.Screen name="Profil">
        {props => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

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
                animation: 'fade',  // Burada animasyon ekledik
              }}
            >
              {!isLoggedIn ? (
                <>
                  <Stack.Screen name="Login" component={LoginWrapper} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                </>
              ) : (
                <Stack.Screen name="MainTabs">
                  {props => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
                </Stack.Screen>
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