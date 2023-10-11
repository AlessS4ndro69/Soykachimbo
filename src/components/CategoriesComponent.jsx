
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { View, Image, Pressable, Text, StyleSheet,  Dimensions, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import tw from "twrnc";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width * 0.9;
const heightBox = screenHeight * 0.15; 

const CategoriesComponent = () => {

    const {categories} = useContext(UserContext);
    const data = categories;
    const navigation = useNavigation();

    if(data){
        return (
            <View style = {tw`m-3`}>
                <View>
                        <Text>Categorias</Text>
                </View>
                
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
            </View>
        );
    }
    return(
        <ActivityIndicator size={"large"}/>
    );
    
};

export default CategoriesComponent;

const styles = StyleSheet.create({
    slide: {
      backgroundColor: '#e3e3e3',
      justifyContent: 'center',
      alignItems: 'center',
      margin:10,
      borderRadius:20
    },
    image:{
      width: screenWidth,
      height: heightBox,
      resizeMode: 'contain',
      borderRadius:20
    },
  });