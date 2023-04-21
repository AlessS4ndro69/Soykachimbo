import { where, getDocs, getFirestore, collection, doc, query, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import {ScrollView, Text, Button, View, Alert, ActivityIndicator, StyleSheet,TouchableOpacity, Image} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, Avatar, Icon} from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import tw from "twrnc";
import UserContext from "../context/UserContext";

import firebase from "../../database/firebase";

const firestore = getFirestore(firebase);

//const q = query(usersRef, where("name" ,"==" ,true));

const COLLECTION = "statements";  /// nombre de la coleccion en firebase
const exerciseRef = collection(firestore,COLLECTION);
//const weekNumber = 2;


const ExercisesListScreen = (props) => {
  const {_week, buyExercise, exercisesHolding, coursesHolding} = useContext(UserContext);
  const navigation = useNavigation();
  

  
  const initialState = {
    id: "",
    codeCourse: null,
    course: null,
    text: "",
    resolution: "",
    captureFilename: null,
    embeddingArray: null,
    week: null

  };

  const [exercises, setExercises] = useState(initialState);
  const [isEmpty, setEmpty] = useState(false);
  const [isFinalize, setFinalize] = useState(false);
  const [loading, setLoading] = useState(false);
  

  let payment = coursesHolding.find((element) => element.week == _week && element.codeCourse ==  props.codeCourse);
  console.log('consulta a coursesHolding : ', payment);
  /*
  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };
*/
  console.log('exercisesHolding context: ', exercisesHolding);
  

  const getExerciseById = (id) => {
    console.log("consultando exercise");
    const q = query(exerciseRef, where("codeCourse", "==", id), where("week","==", _week));
    
    
    
    
    onSnapshot(q, (querySnapshot) => {
      
      setLoading(true);
      const exercises = [];
      querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          const { course,codeCourse, text, resolution, captureFilename, embeddingArray, week, sequence} = doc.data();
          
          let pay;
          
          if(payment){
            pay = true;
          }else{
            pay = exercisesHolding.includes(doc.id);
            console.log('no se activa pay:....');
          }
          
          
          
          
          console.log('pay desde repository list: ',pay);

          exercises.push({
            id: doc.id,
            pay: pay,        /////// indicador de compra de ejercicio      
            price: 19 + Math.floor(Math.random()*(23-17)),
            codeCourse,
            course,
            text,
            resolution,
            captureFilename,
            embeddingArray,
            week,
            sequence
                        
          });
          pay = false;
          
      });
      setEmpty(querySnapshot.empty);
      setExercises(exercises);
      setFinalize(true);
      
      //console.log("Current exercises: ", exercises.join(", "));

    });
    
    setLoading(false);

  };
/*
  const consultSolution = async() => {
    const docRef = doc(firestore, 'images',refResolution);
    const docSnap =  await getDoc(docRef); 
    const path = docSnap.data().path;
  }; 
*/
  useEffect(() => {
    
    getExerciseById(props.codeCourse);  /// obtiene el id por parametro de navigation
    console.log("dato recibido en repositorilist: ",props.codeCourse);
    
    
  }, [_week, exercisesHolding]);


  
  return (
    <ScrollView>
        {isEmpty  && <Text>No se encontro ejercicios</Text>}
      {!isFinalize && <View >
                    <ActivityIndicator size="large" color="#9E9E9E" />
                  </View>}

      { isFinalize && exercises.map((exercise) => {
        return (
          <ListItem 
            key={exercise.sequence}
            bottomDivider
            disabled = {!exercise.pay}
            onPress={() => { if(exercise.pay){
              navigation.navigate("SolutionScreen", {
                refResolution:exercise.resolution
              });
            }
              
            }}
          >
            <ListItem.Chevron />
            {exercise.resolution && <Avatar style = {tw`w-15 h-15`}
                                    source={{
                                      uri:
                                        "https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-lapiz-papel-concepto-icono-objeto-educacion-aislado-estilo-dibujos-animados-plana_138676-2137.jpg",
                                    }}
                                    rounded
                
              />}
            
            
            <ListItem.Content >
              <ListItem.Title>Ejercicio: {exercise.sequence}</ListItem.Title>
              <ListItem.Subtitle>{exercise.text}</ListItem.Subtitle>
            </ListItem.Content>
                    {  !exercise.pay &&
                    
                    <TouchableOpacity     
                        style = {tw`bg-gray-200 ` } 
                        onPress={() => buyExercise(exercise.id, exercise.price)}>
                        
                        <View style={tw `pt-2`}>
                            <Image
                                style = {{width: 50, height: 50, resizeMode: "contain"}}
                                source = {{uri : 'https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/256/external-coin-ecommerce-xnimrodx-lineal-color-xnimrodx.png'}}
                            />
                            <Text style= {tw` font-semibold`}> {exercise.price} stars</Text>  
                        </View>
                    </TouchableOpacity>}
          </ListItem>
        );
      })}
      
    </ScrollView>
  );
};

export default ExercisesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});