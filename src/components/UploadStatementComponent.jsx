import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, Alert } from "react-native";
import firebase from "../../database/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore(firebase);
const storage = getStorage(firebase);

const UploadStatementComponent = (props) => {

    const navigation = useNavigation();
    const route = useRoute();
    const captureFilename = props?.captureFilename;
    const storageRefStatement = ref(storage, captureFilename);
    console.log("capturefilenamem: ", captureFilename);

    const initialState = {
        course: null,
        codeCourse:null,
        week: null,
        captureStatement: props?.imageOcr,
        captureFilename: props?.captureFilename,
      
        text: props?.textOCR,
        embeddingArray: null,
        resolution: null,   /////// puede haber varias propuestas de solucion
        sequence: null,
        solved: false
      };    
    const [data, setData] = useState(initialState);
    const [finish, setFinish] = useState(false);
    const [pathUrl, setUrl] = useState("");
    

    //const {course, codeCourse, week, captureImage, captureFilename, sequence} = useData();

    const [uploading,setUploading] = useState(false);
    //const [refSolution, setRefSolution] = useState(null);
    const [refStatement, setRefStatement] = useState(null);

    let refSolution = null;
    //console.log(captureFilename);
    //console.log("llamando a text desde adddatafirebase");
    //console.log(props.text);

    
    //const storegeRefSolution = ref(storage,)
    const metadata = {
      contentType: 'image/jpeg',
    }; 
    
      const saveNewStatement = async (pathUrl) => {

            
          try {
            
            setUploading(true);
            const docRef = await addDoc(collection(db, "statements"), {
                course: "Free",
                codeCourse: 515,
                week: 1,
                captureStatement: pathUrl,
                captureFilename: props?.captureFilename,
            
                text: props?.textOCR,
                embeddingArray: [12,13,14],
                resolution: refSolution,   /////// puede haber varias propuestas de solucion
                sequence: 1,
                solved: false
            });

            console.log("Document written with ID: ", docRef.id);
            
          
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          //navigation.goBack();
          Alert.alert('El ejercicio se envio a un especialista para su resolución');
          navigation.goBack();
          
      };

      const uploadImage = async(storageRef,metadata) => {
        
        const response = await fetch(data.captureStatement);
        const blob = await response.blob();
        
        let up = uploadBytes(storageRef, blob,metadata).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    //setSave(true);
                    setUploading(false);
                  });
        try {
          await up;
          setFinish(true);
          setUploading(false);

          //// -------- agregamos el path del statement ---------
      
          getDownloadURL(ref(storage, captureFilename)).then(async(url) => {
            //setUrl(url);
            console.log('consultado pathurl: ',url);
            await saveNewStatement(url);
            //createReferenciaStatement(url);
          })
          .catch((error) => {
            // Handle any errors
            console.log(error);
          });


          
        }catch(e){
          console.log(e);
        }
        
      };

      useEffect(() => {
        const add = async() => {

          const docRefSolution = await addDoc(collection(db,"images"),{
            name: null,
            uri: null
          });
          //setRefSolution(docRefSolution.id);
          refSolution = docRefSolution.id;
          console.log("referencia para image resolution: ",docRefSolution.id);

          await uploadImage(storageRefStatement,metadata);
        };
        add();


        
        
      },[]);

      return (
        <View >
          {/*<Image source={{ uri: data.captureStatement }} style={{alignItems:'center', width: 300, height: 100, marginBottom:3}} />*/}
          {/* Input */}
          {/*!uploading  && pathUrl &&<View >
                      <Button title="Save Data" onPress={ async() => {
                        await saveNewStatement();
                        //await createReferenciaStatement();
                      }} />
                    </View>*/}      
          
          {uploading && <ActivityIndicator size={'large'}/>}

        </View>
      );

};

export default UploadStatementComponent

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
    loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    button:{
      justifyContent: "flex-end",
      padding: 20
    }
  });