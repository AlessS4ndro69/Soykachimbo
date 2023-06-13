import React, {useState, useEffect, useContext } from 'react';
import { View, Button, Image, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

import firebase from '../../database/firebase';
import { collection, getDocs, getFirestore, query, getDoc, doc, setDoc, updateDoc, addDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import UserContext from '../context/UserContext';

import tw from 'twrnc';

const firestore = getFirestore(firebase);
const storage = getStorage();
const imagesRef = collection(firestore, 'images');

    //const storegeRefSolution = ref(storage,)
const metadata = {
  contentType: 'image/jpeg',
}; 

const ProposalSolution = (props) => {
    const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pathUrl, setUrl] = useState("");
  const [finish, setFinish] = useState(false);
  const [save, setSave] = useState(false);
  const [image, setImage] = useState(null);
  const [existSolution, setExistSolution] = useState(false); //// no existe predeterminado
  const [filename, setFilename] = useState("");

  const route = useRoute();
  const navigation = useNavigation();

  const refResolution = route.params.refResolution;
  const setProposal = props.setProposal;
  const refStatement = route.params.refStatement;

  

  const {user} = useContext(UserContext);

    const pickImage = async () => {
        setLoading(true);
        setProposal(true);
        // No permissions request is necessary for launching the image library
    
        /// esta rechazando promesas
        let result = await ImagePicker.launchCameraAsync({
          base64: true,
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [2, 3],
          quality: 0.3,
        });
        
    
        if(!result.canceled){
          const filename = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/')+1);
          setFilename(filename);
          const storageRef = ref(storage, filename);
          setExistSolution(true);
          setImage(result);
          //// corregir no se ejecuta correctamente---------------
          //if(image){
          //console.log(result.assets[0]);
          uploadImage(storageRef, metadata, result, filename);
          //}
          //setSave(true);
        }
    
    };
    
    const uploadImage = async(storageRef, metadata, result, filename) => {
        setUploading(true);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        
        let up = uploadBytes(storageRef, blob,metadata).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    setSave(true);
                    setLoading(false);
                  });
        try {
          
          await up;
          console.log(save);
          
          //// -------- agregamos el path de la resolucion ---------
          
          getDownloadURL(ref(storage, filename)).then((url) => {
            setUrl(url);
            console.log('consultado pathurl: ',url);
          })
          .catch((error) => {
            // Handle any errors
            console.log(error);
          });
    
        }catch(e){
          console.log(e);
        }
      };

      const createReferenciaSolution = async() => {
    
        console.log('agregando propuesta con referencia: ', refResolution);
        //const ref = doc(firestore, "images", refResolution);
        /*
        await updateDoc(ref, {
          name: filename,
          uri: pathUrl,
          accept: 0,    /////// 0: en espera, 1: aceptado, 2: rechazado
          author: user.uid,
          supervisor: null,
          reason: "",   ///// mensaje para el author de la propuesta.
          //statement: refStatement,
        });        
        const d = await getDoc(ref);
        console.log("solution actualizado mrd: ",d.data());
        */
        
        await addDoc(collection(firestore,'images'),{
          name: filename,
          uri: pathUrl,
          accept: 0,    /////// 0: en espera, 1: aceptado, 2: rechazado
          author: user.uid,
          supervisor: null,
          reason: "",   ///// mensaje para el author de la propuesta.
          statement: refStatement,
        });

        setFinish(true);
      };

      if(finish){
        Alert.alert('Propuesta enviada a revisión a un especialista');
        navigation.goBack();
        
      }


    return (
        <View>
            {!save && !loading && <Button title = "empezar" onPress={pickImage} />}
            {loading && <ActivityIndicator size = {'large'}/>}
            {save && pathUrl && <Button title="Save data" onPress={createReferenciaSolution}/>}
            
        </View>
        
    );
};

export default ProposalSolution;