import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import {GOOGLE_VISION_API_KEY} from '@env';



//import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
//const storage = getStorage();
//import {GOOGLE_VISION_API_KEY} from "@env";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


const API_KEY = GOOGLE_VISION_API_KEY;

console.log(API_KEY);

const OCR = (props) => {

  const navigation = useNavigation();
  
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [googleVisionResponse, setGoogleVisionResponse] = useState(null);
  const [rectangles, setRectangles] = useState(null);
  const [lengthOfDetectedObject, setlengthOfDetectedObject] = useState(0);

  const pickCamera = async () => {
    // No permissions request is necessary for launching the image library
    
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 1],
      quality: 0.3,
    });

    //console.log(result.assets[0].base64);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      fetchObjectRecognition(result.assets[0].base64);
      props?.setImageOcr(result.assets[0].uri);
      console.log("ingresa a recognition");
      const filename = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/')+1);
      props?.setCaptureFilename(filename);
    }else{console.log("fallo image picker camera");}
    
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
    //let result = await ImagePicker.launchCameraAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 1],
      quality: 0.3,
    });

    //console.log(result.assets[0].base64);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      fetchObjectRecognition(result.assets[0].base64);
      props?.setImageOcr(result.assets[0].uri);
      const filename = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/')+1);
      props?.setCaptureFilename(filename);
    }
    
  };
  const metadata = {
    contentType: 'image/jpeg',
  };
  //const storageRef = ref(storage, 'child3.jpg');
  
  //const uploadTask = uploadBytes(storageRef, image, metadata);
  

  const fetchObjectRecognition = async (base64) => {
    setLoading(true);
    setGoogleVisionResponse(null);
    setRectangles(null);
    setlengthOfDetectedObject(null);
    //setImage(null);
    

    let googleVisionRes = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key='.concat(API_KEY),
      {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64, //// base 64 es la imagen formateada
              },
              features: [
                {type: 'LABEL_DETECTION', maxResults: 13},
                {type: 'OBJECT_LOCALIZATION', maxResults: 5},
                // {type: 'LANDMARK_DETECTION', maxResults: 5},
                // {type: 'FACE_DETECTION', maxResults: 5},
                // {type: 'LOGO_DETECTION', maxResults: 5},
                {type: 'TEXT_DETECTION', maxResults: 5},
                // {type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5},
                // {type: 'SAFE_SEARCH_DETECTION', maxResults: 5},
                // {type: 'IMAGE_PROPERTIES', maxResults: 5},
                // {type: 'CROP_HINTS', maxResults: 5},
                // {type: 'WEB_DETECTION', maxResults: 5},
              ],
            },
          ],
        }),
      },
    );
    await googleVisionRes
      .json()
      .then((response) => {
        console.log('hay texto???');
        console.log(response?.responses[0]['fullTextAnnotation']);
        if(response?.responses[0]['fullTextAnnotation']){
            setText(response.responses[0]['fullTextAnnotation']['text']);
            props?.setRequest(response.responses[0]['fullTextAnnotation']['text']);
        }else{ 
          setText("No se visualiza texto");
          props?.setRequest("No se visualiza texto");

        }

        //setText(response.responses[0]['fullTextAnnotation']['text']);
        
        console.log('localizations \n');
        console.log(response?.responses[0]['localizedObjectAnnotations']);
        
        setLoading(false);
        if (response) {
          parseVisionResponse(response);
          console.log(parseVisionResponse(response?.responses[0]));
          //setGoogleVisionResponse(response?.responses[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        setGoogleVisionResponse(error);
      });
  };
  const parseVisionResponse = (response) => {
    let objects = [];
    let rectanglesForObject = [];
    const detectedObjects = response?.responses[0]['labelAnnotations'];
    const localizedObjectAnnotations =
      response?.responses[0]['localizedObjectAnnotations'];

    console.log('locallll objeectss');
    console.log(localizedObjectAnnotations);

    //console.log('detected objects');
    detectedObjects.map;
    for (const detectedObject in detectedObjects) {
      //console.log(detectedObjects[detectedObject]);
      objects.push({
        description: detectedObjects[detectedObject]['description'],
        score: detectedObjects[detectedObject]['score'],
      });
    }

    for (const localizedObjectAnnotation in localizedObjectAnnotations) {
      //console.log(detectedObjects[detectedObject]);
      rectanglesForObject.push({
        name: localizedObjectAnnotations[localizedObjectAnnotation]['name'],
        coordinates:
          localizedObjectAnnotations[localizedObjectAnnotation]['boundingPoly'][
            'normalizedVertices'
          ],
      });
    }

    setGoogleVisionResponse(
      rectanglesForObject.map((data) => {
        return (
          <View key={data.name} style={styles.descText}>
            <Text> Detected Object: {data.name} </Text>
          </View>
        );
      }),
    );
    setRectangles(
      rectanglesForObject.map((data) => {
        return (
          <View
            key={data.name}
            style={{
              height:
                Math.abs(data.coordinates[0]['y'] - data.coordinates[3]['y']) *
                  100 +
                '%',
              width:
                Math.abs(data.coordinates[0]['x'] - data.coordinates[1]['x']) *
                  100 +
                '%',
              borderWidth: 2,
              borderColor: 'red',
              position: 'absolute',
              zIndex: 99,
              top: Math.abs(data.coordinates[0].y) * 96 + '%',
              left: Math.abs(data.coordinates[0].x) * 110 + '%',
            }}></View>
        );
      }),
    );

    setlengthOfDetectedObject(rectanglesForObject.length);
  };

  useEffect(() => {
    const isRunningInExpoGo = Constants.appOwnership === 'expo'
    if(isRunningInExpoGo){
      pickImage();
    }else{
      pickCamera();
    }
    
    
  },[]); 

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* !image && <Button title="Pick an image from gallery" onPress={pickImage} />*/}
      {/*!image && <Button title="Pick an image from camera" onPress={pickCamera} />*/}
      { image && <Image source={{ uri: image }} style={{width: 300, height: 100, marginBottom:3}} /> }
      { loading && <ActivityIndicator size = "large"/>}
      

      <Text style = {tw`p-2 mt-2`}>{text}</Text>
      {/*image && <Button title="Regresar a inicio" onPress={() => navigation.navigate('HomeScreen')}/>*/}
    </View>
  );

    
}

export default OCR;
