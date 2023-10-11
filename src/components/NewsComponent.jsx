import React, { useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { View, StyleSheet, Dimensions, ScrollView, Text, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


const screenHeight = Dimensions.get('window').height;
const squareSide = screenHeight * 0.22; // 25% de la altura de la pantalla


const NewsComponent = () => {
  const {news} = useContext(UserContext);
  const data = news;
  const navigation = useNavigation();
  console.log("desde slidercomponet: ",data);

    

  return (
    <View style = {tw`m-3`}>
        <View style = {tw`h-10 m-1`}>
        <Text style = {tw`text-black opacity-80`}>Novedades</Text>
        </View>
        {!data && <ActivityIndicator size={'large'}/>}
        {data && <ScrollView 
            horizontal
            showsHorizontalScrollIndicator = {false}

        >
            {
                data.map((item, index)=> (
                    <View key={index} style={styles.slide}>
                    <Pressable

                        onPress={()=>{
                          console.log("presionaste una novedad");

                          if(item.mode){
                            navigation.navigate(item.screen,{
                              modeScreen : item.mode
                            });
                          }
                          else{
                            navigation.navigate(item.screen);
                          }
                          
                        }}
                        disabled = {!item.screen}
                    >
                    <Image
                        source={{ uri: item.uri}} // Ejemplo de imagen de muestra desde "via.placeholder.com"
                        style={styles.image}
                    />
                    </Pressable>  
                    </View>
                )) 
            }
        </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    borderRadius:20
  },
  image:{
    width: squareSide,
    height: squareSide* 1.3,
    resizeMode: 'contain',
    borderRadius:20,
    
  },
});

export default NewsComponent;
