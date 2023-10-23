import React, {useState, useEffect } from 'react';
import { Text, View, Button, Image, Dimensions, StyleSheet, Alert, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from 'twrnc';
import { usePreventScreenCapture } from 'expo-screen-capture';
import {TYPESENSE_KEY} from "@env";
import { Icon } from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';
import { Surface } from 'react-native-paper';

import firebase from '../../database/firebase';
import { collection, getDocs, getFirestore, query, getDoc, doc, setDoc, updateDoc, increment} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProposalSolution from '../components/ProposalSolution';
import BannerAdGoogle from '../components/BannerAdGoogle';


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
  const [vote, setVote] = useState(false);
  const [numberViews, setNumberViews] = useState(null);
  const [numberLikes, setNumberLikes] = useState(null);
  const [numberDislikes, setNumberDislikes] = useState(null);
  
  const route = useRoute();
  const navigation = useNavigation();
  const refResolution = route.params.refResolution;
  const refStatement = route.params.refStatement;
  console.log("refResolution: ",refResolution);
  //const docRef = doc(firestore, "statements", refStatement);

  usePreventScreenCapture();

  const voteLike = async() => {
    await updateDoc(docRef,{
      likes: increment(1)  
    });
  };
  const voteDislike = async() => {
    await updateDoc(docRef,{
      dislikes: increment(1)  
    });
  };
   
  useEffect(() => {
  
    //const q = query(imagesRef);
    let uri;
    const getUri = async() => {
      setLoading(true);
      const docRef = doc(firestore, 'images',refResolution);
      const docSnap =  await getDoc(docRef); 
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        const document = docSnap.data();
        uri = docSnap.data().uri;
        /// MODIFICACION DE LA ESTRUCUTRA DE LA TABLA EN PRODUCCIÓN
      
        setNumberViews(document.views);
        setNumberDislikes(document.dislikes);
        setNumberLikes(document.likes);

        await updateDoc(docRef,{
          views: increment(1) 
        });
        
        
        
        
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      
      /*
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
      */
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

      //// obteniendo stadisticas
      
      
      

    };
    getUri();

  },[]);

  return (
    <SafeAreaProvider>
      <View style= {tw`bg-white p-5 h-full items-center `}>
        <View style = {tw` justify-center items-center` }>
          <BannerAdGoogle/>
          <Text style = {tw`text-base font-black`}> Solución propuesta: </Text>
          {/*uri && !loading && <Image 
                                          style={{ width: 350, height: 510}}
                                          source={{uri: uri}}
                                />*/}
          {uri && !loading && <ImageZoom cropWidth={Dimensions.get('window').width*0.9}
                                      cropHeight={Dimensions.get('window').height*0.75  }
                                      imageWidth={350}
                                      imageHeight={510}>
                                      <Image style={{ width: 340, height: 510}}
                                      source={{uri: uri}}/>
                                      </ImageZoom>}

          {!existSolution && !proposal &&<Text style = {tw`text-base font-black`}>Solución no encontrada xd</Text>}
          {/*!existSolution && !proposal &&<Text style = {tw`text-base font-black text-center`}>¡Intenta resolver el ejercicio y Gana 20 stars! xD</Text>*/}
          {/*!existSolution && !proposal &&<Text style = {tw`text-base font-black text-center`}>Toma captura a tu propuesta de solución, mucha suerte.</Text>*/}
          {/*!existSolution && <ProposalSolution refResolution = {refResolution} setProposal = {setProposal} refStatement = {route.params.refStatement}/>*/}
          {existSolution && loading && <ActivityIndicator size = {'large'}/>}
          
          
          {!loading && <Text style = {tw`text-black text-opacity-50`}>{numberViews} views</Text>}  
          {!loading && <Text style = {tw`text-black text-opacity-50`}>A {numberLikes} personas les gustó esto</Text>}  
          {/*!loading && <Text style = {tw`text-black text-opacity-50`}>{numberDislikes} dislikes</Text>*/}         
        </View>        
        {/*!vote &&  existSolution && <View style={tw`flex-row p-1 justify-between w-60`}>
          
            <Surface style={tw` rounded rounded-full`} elevation={4}>
            <Icon reverse
                
                name = "heart"
                color = "#1267F3"
                type = "fontisto"
                onPress={() => {
                  console.log("presionando like");
                  setVote(!vote);
                  voteLike();
                }}       
           /></Surface>  
          
          
            <Surface style={tw` rounded rounded-full`} elevation={4}>
            <Icon reverse
                
                name = "heart-broken"
                color = "#1267F3"
                type = "font-awesome-5"
    
                
                onPress={() => {
                  console.log("presionando dislike");
                  setVote(!vote);
                  voteDislike();
                }}
                
            /></Surface>
            
    
           
              </View>*/}
        </View> 
      
      

    </SafeAreaProvider>
    
  );
};
export default SolutionScreen;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:80
  },
});
