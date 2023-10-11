import React from 'react';
import { View, TouchableOpacity, Image, Share, Dimensions, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import tw from 'twrnc';

const appVersion = Constants.expoConfig.version;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height*0.13;

const ShareAppButton = () => {
  

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: '¡Con esta aplicación lograras tu ingreso a la universidad! \n\n' + "https://play.google.com/store/apps/details?id=com.aless4ndro.soykachimbo",
        url: 'https://play.google.com/store/apps/details?id=com.aless4ndro.soykachimbo', // URL de la página de la aplicación (reemplazar por la URL real de tu aplicación)
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Compartido con éxito
          console.log(`Compartido con éxito a través de ${result.activityType}`);
        } else {
          // Compartido con éxito
          console.log('Compartido con éxito');
        }
      } else if (result.action === Share.dismissedAction) {
        // Compartir cancelado
        console.log('Compartir cancelado');
      }
    } catch (error) {
      // Manejo de errores al compartir
      console.log('Error al compartir', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onShare}>
        <Image
          source={ {uri : "https://firebasestorage.googleapis.com/v0/b/repository-exercises.appspot.com/o/Creative%20Corner%20(1).png?alt=media&token=26d479e0-0c0a-46cf-b68e-ad6661a90f76"}} // Asegúrate de proporcionar el icono de compartir correcto
          style={styles.icon}
        />
      </TouchableOpacity>
      
              <Text style={tw`text-xs`}>v {appVersion}</Text>
            
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  icon: {
    width: width,
    height: height,
    resizeMode: 'contain',
    borderRadius: 20,
    alignItems: 'center'
  },
});

export default ShareAppButton;
