import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Text, Animated, Easing, View, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Svg, { Path } from 'react-native-svg';


const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};
const getRandomAnimation = () => {
  const animations = ['fadeIn', 'fadeOut', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideInDown'];
  return animations[Math.floor(Math.random() * animations.length)];
};

const StarAnimation = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const startAnimation = () => {
    
    setAnimationStarted(true);
    setTimeout(() => {
      setAnimationStarted(false);
    }, 2000);
  };

  const smallStars = Array.from({ length: 5 }).map((_, index) => (
    <Animatable.View
      key={index}
      animation={animationStarted ? getRandomAnimation() : null}
      duration={3000}
      easing="linear"
      useNativeDriver
      style={{
        position: 'absolute',
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: '#FCC419',
        transform: [{ translateX: getRandomValue(-50, 50) }, { translateY: getRandomValue(-50, 50) }],
      }}
    />
  ));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStarted(true);
      setTimeout(() => {
        setAnimationStarted(false);
      }, 2000);
    }, 10500); // Cambia el intervalo de tiempo aquí (2500ms = 2.5 segundos)
    
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
    
    
    
    {<TouchableOpacity onPress={startAnimation}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animatable.View
          animation={animationStarted ? 'shake' : null}
          duration={4000}
          useNativeDriver
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Svg width={90} height={90} viewBox="0 0 24 24">
            <Path
              d="M12 2l3.09 6.31 6.9.99-5 4.86 1.18 6.88L12 18.18 5.82 21.04l1.18-6.88-5-4.86 6.9-.99L12 2zm0 10l-3.09 1.67.75-3.63-2.59-2.38 3.6-.31L12 4l1.33 2.35 3.6.31-2.59 2.38.75 3.63L12 12z"
              fill="#FCC419"
            />
          </Svg>
        </Animatable.View>
        {animationStarted && smallStars}
      </View>
      
    </TouchableOpacity>}
    
    
    </View>
  );
};

export default StarAnimation;

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  }
});