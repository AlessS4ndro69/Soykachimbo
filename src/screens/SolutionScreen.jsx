import React, {useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from 'twrnc';
import { usePreventScreenCapture } from 'expo-screen-capture';
import {TYPESENSE_KEY} from "@env";

import firebase from '../../database/firebase';
import { collection, getDocs, getFirestore, query, getDoc, doc, setDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProposalSolution from '../components/ProposalSolution';

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
  const [proposal, setProposal] = useState(false); //// alumno propone solucion
  
  const route = useRoute();
  const navigation = useNavigation();
  const refResolution = route.params.refResolution;
  console.log("refResolution: ",refResolution);


  usePreventScreenCapture();
   
  useEffect(() => {
  
    //const q = query(imagesRef);
    const getUri = async() => {
      setLoading(true);
      //const docRef = doc(firestore, 'images',refResolution);
      ///const docSnap =  await getDoc(docRef); 
      //const uri = docSnap.data().uri;
      let uri;
      const options = {
        method: "GET",
        headers: {
            'X-TYPESENSE-API-KEY': TYPESENSE_KEY
        },
      }
      ////// ----------- CAMBIAR EL NOMBRE DE LA COLLECION USER-HOLDING --------////////
      await fetch("https://ozp6k178lebiw5tap-1.a1.typesense.net:443/collections/users_holding/documents/search?q=".concat(refResolution+'&query_by=solution_id'),options)
      .then(res => res.json())
      .then(response => {
          console.log("Result of typesense: ",response.hits);
          //setResponseTypesense(response.hits);
          uri = response.hits[0]?.document.uri;
      });

      if (uri){
          setLoading(true);
          //setExistSolution(true);
          console.log(refResolution);
          console.log("existe o no solution: ",uri);
        
          setUri(uri);
          
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
      
        <View style = {tw`bg-white p-5 h-full  justify-center items-center` }>

          <Text style = {tw`text-base font-black`}> Solución propuesta: </Text>
          {uri && !loading && <Image 
                                          style={{ width: 350, height: 510}}
                                          source={{uri: uri}}
                      />}

          {!existSolution && !proposal &&<Text style = {tw`text-base font-black`}>Solución no encontrada xd</Text>}
          {!existSolution && !proposal &&<Text style = {tw`text-base font-black text-center`}>¡Intenta resolver el ejercicio y Gana 20 stars! xD</Text>}
          {!existSolution && !proposal &&<Text style = {tw`text-base font-black text-center`}>Toma captura a tu propuesta de solución, mucha suerte.</Text>}
          {!existSolution && <ProposalSolution refResolution = {refResolution} setProposal = {setProposal} refStatement = {route.params.refStatement}/>}
          {existSolution && loading && <ActivityIndicator size = {'large'}/>}
          
        </View>        
        
        
      
      

    </SafeAreaProvider>
    
  );
};
export default SolutionScreen;


