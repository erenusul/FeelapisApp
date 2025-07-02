// import React, { useEffect, useRef } from 'react';
// import { View, Image, Animated, Dimensions, StyleSheet } from 'react-native';

// const stones = [
//   require('../assets/stone1.png'),
//   require('../assets/stone2.png'),
//   require('../assets/stone3.png'),
// ];

// const { width, height } = Dimensions.get('window');

// function random(min, max) {
//   return Math.random() * (max - min) + min;
// }

// export default function FallingStones() {
//   const animatedValues = useRef(
//     stones.map(() => new Animated.Value(0))
//   ).current;

//   useEffect(() => {
//     const animations = animatedValues.map((anim, i) => {
//       const duration = random(4000, 8000);
//       anim.setValue(0);
//       return Animated.loop(
//         Animated.timing(anim, {
//           toValue: height,
//           duration,
//           useNativeDriver: true,
//         })
//       );
//     });

//     Animated.stagger(500, animations).start();

//     // Cleanup animasyonları durdur
//     return () => animations.forEach(anim => anim.stop());
//   }, []);

//   return (
//     <View style={StyleSheet.absoluteFill}>
//       {stones.map((source, i) => {
//         const translateX = random(0, width - 50);
//         return (
//           <Animated.Image
//             key={i}
//             source={source}
//             style={[
//               styles.stone,
//               {
//                 transform: [
//                   { translateY: animatedValues[i] },
//                   { translateX },
//                   { rotate: animatedValues[i].interpolate({
//                       inputRange: [0, height],
//                       outputRange: ['0deg', '360deg']
//                     })
//                   }
//                 ]
//               }
//             ]}
//             resizeMode="contain"
//           />
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   stone: {
//     position: 'absolute',
//     width: 40,
//     height: 40,
//   },
// });