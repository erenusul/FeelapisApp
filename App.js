import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootSiblingParent } from 'react-native-root-siblings';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './CartContext';

function DummyScreen() {
  return null;
}

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

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Favorites') iconName = 'heart-outline';
          else if (route.name === 'Cart') iconName = 'cart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF8A00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Favorites" component={DummyScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

let setIsLoggedInGlobal;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  setIsLoggedInGlobal = setIsLoggedIn;

  return (
    <RootSiblingParent>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <Stack.Screen name="Login" component={LoginWrapper} />
            ) : (
              <Stack.Screen name="MainTabs" component={MainTabs} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </RootSiblingParent>
  );
}

function LoginWrapper({ navigation }) {
  return (
    <LoginScreen navigation={navigation} onLoginSuccess={() => setIsLoggedInGlobal(true)} />
  );
}