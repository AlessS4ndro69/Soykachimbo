import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const PencilAnimation = () => {
  const pencilRef = useRef(null);

  useEffect(() => {
    // Inicia la animación del lápiz cuando el componente está montado.
    startPencilAnimation();
  }, []);

  const startPencilAnimation = () => {
    if (pencilRef.current) {
      // Anima el lápiz de izquierda a derecha y viceversa.
      pencilRef.current
        .swing(2000) // Duración de la animación (ms)
        .then(() => {
          // Una vez que la animación completa, reinicia la animación para que el lápiz se mueva en ambos sentidos.
          startPencilAnimation();
        });
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        ref={pencilRef}
        source={require('../../assets/pencil.png')} // Ruta de la imagen del lápiz
        style={styles.pencil}
        animation="slideInLeft"
        duration={2000}
        iterationCount="infinite"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pencil: {
    width: 300,
    height: 300,
    transform: [{ rotate: '90deg' }],
  },
});

export default PencilAnimation;
