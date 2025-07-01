import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function AnimatedHeart({ active, onPress }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withSequence(
        withTiming(1.5, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
      opacity.value = withSequence(
        withTiming(0.5, { duration: 150 }),
        withDelay(150, withTiming(1, { duration: 150 }))
      );
    }
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Ionicons
          name={active ? 'heart' : 'heart-outline'}
          size={24}
          color={active ? '#FF3B30' : '#FF8A00'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 36,             // Sabit genişlik
    height: 36,            // Sabit yükseklik
    borderRadius: 18,      // Tam yuvarlaklık için yarı genişlik
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});