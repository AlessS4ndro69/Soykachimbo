
import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';


const HyperLinkComponent = (props) => {
    const handleLinkPress = () => {
      const url = props.url; // Aquí coloca la URL que desees enlazar
      Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
    };
  
    return (
      <View>
        <Text>
          Este es un texto con un{' '}
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
              hipervínculo
            </Text>
          </TouchableOpacity>
          {' '}a un sitio web.
        </Text>
      </View>
    );
  };

  export default HyperLinkComponent;