import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { View, Image, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PubComponent = () => {
  const {adidasUri} = useContext(UserContext);
  const [uri, setUri] = useState(adidasUri);
  const screenWidth = Dimensions.get('window').width * 0.9;
  const imageHeight = Dimensions.get('window').height * 0.15; // 15% de la altura de la pantalla
  const navigation = useNavigation();
  
  //const uri = 'https://firebasestorage.googleapis.com/v0/b/repository-exercises.appspot.com/o/Diseño%20sin%20título.png?alt=media&token=2de42f14-6fd2-4b4a-9971-b6e36ed49719' 
  useEffect(()=>{
    setUri(adidasUri);
    console.log("desde pubg: ", uri);
  },[adidasUri]);

  return (
    <View style ={{margin:10}}>
      {uri && <TouchableOpacity
        
        onPress={()=>{
          console.log("presionaste pubg");
          navigation.navigate("PracticeTiktokScreen");
        }}
      >
      <Image
        source={{ uri: adidasUri }} // Ejemplo de imagen de muestra desde "via.placeholder.com"
        style={{ width: screenWidth, height: imageHeight,resizeMode: 'contain', borderRadius:30, alignSelf:'center'}}
      />
      </TouchableOpacity>}
      {!uri && <ActivityIndicator size={'large'}/>}
    </View>
  );
}

export default PubComponent;
