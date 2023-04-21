import React, {useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from 'twrnc';

import firebase from '../../database/firebase';
import { collection, getDocs, getFirestore, query, getDoc, doc, setDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const firestore = getFirestore(firebase);
const storage = getStorage();
const imagesRef = collection(firestore, 'images');

    //const storegeRefSolution = ref(storage,)
const metadata = {
  contentType: 'image/jpeg',
}; 


const SolutionScreen = (props) => {

  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState("");
  const [existSolution, setExistSolution] = useState(true); //// existe predeterminado

  
  
  const route = useRoute();
  const navigation = useNavigation();
  const refResolution = route.params.refResolution;

  useEffect(() => {
  
    //const q = query(imagesRef);
    const getUri = async() => {
      setLoading(true);
      const docRef = doc(firestore, 'images',refResolution);
      const docSnap =  await getDoc(docRef); 
      const path = docSnap.data().uri;
      if (docSnap.data().uri){
          setLoading(true);
          //setExistSolution(true);
          console.log(refResolution);
          console.log("existe o no solution: ",docSnap.data().uri);
        
          setUri(docSnap.data().uri);
          
          /*
          getDownloadURL(ref(storage, path))
          .then((url) => {
            setUrl(url);
            console.log(pathUrl);
            setLoading(false);
          })
          .catch((error) => {
          // Handle any errors
            console.log(error);
          });*/
          setLoading(false);
      }else{
        setExistSolution(false);
        setLoading(false);
      }
      
      //if(uri) setLoading(false);
    };
    getUri();

  },[]);

  return (
    <SafeAreaProvider>
      <ScrollView style = {tw`bg-white h-full `}>
        <View style = {tw`p-8 h-full justify-center items-center` }>
          {uri && !loading && <Image 
                                          style={{alignItems:'center', width: 350, height: 530}}
                                          source={{uri: uri}}
                      />}

          {!existSolution && <Text>Solución no encontrada xd</Text>}
          {existSolution && loading && <ActivityIndicator size = {'large'}/>}
          
        </View>        
        
        
      
      </ScrollView>

    </SafeAreaProvider>
    
  );
};
export default SolutionScreen;


