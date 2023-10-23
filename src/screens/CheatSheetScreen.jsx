import { use, useEffect, useState } from "react";
import {StyleSheet, Button, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Pressable, FlatList} from "react-native";
import tw from 'twrnc';

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import Equation from "../components/EquationComponent";
import firebase from "../../database/firebase";
import { getFirestore, addDoc, collection, query, getDocs, where } from "firebase/firestore";
import { ListItem } from "react-native-elements";

import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator, Modal } from "react-native-paper";
import BannerAdGoogle from "../components/BannerAdGoogle";
  
  const courses = [
    { courseCode: 13,  name: 'Algebra', icon: 'graduation-cap' },
    { courseCode: 14, name: 'Aritmetica', icon: 'calculator' },
    { courseCode: 16,  name: 'Geometria', icon: 'square' },
    { courseCode: 11,  name: 'Trigonometria', icon: 'angle-double-right' },
    
    //{ courseCode: 101,  name: 'Quimica', icon: 'flask' },
    //{ courseCode: 102,  name: 'Fisica', icon: 'rocket' },
  ];
    
      

const db = getFirestore(firebase);

const CheatSheetScreen = () => {
    const initialState = {
        codeCourse: null,
        course: "",
        expression: "",
        name: "",
        topic: ""
    };
    const [formulas, setFormulas] = useState(initialState);
    const [equ, setEqu] = useState("");
    const [isFinalize, setFinalize] = useState(false);
    const [isSelectedCourse,setSelectedCourse] = useState(false);
    const [selectCourse, setSelectCourse] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    

    

    const renderFormula = ({item}) => (
      <ListItem
        key={item.id}
      >
        <View
                        style={{
                            borderRadius: 10,
                            backgroundColor: '#FDF5E6', // Color de fondo crema
                            borderWidth: 3, // Borde delgado
                            borderColor: '#1267F3', // Color de borde azul
                            width: 250, // Ancho del View
                            height: 100, // Altura del View
                            alignItems: "center",
                            justifyContent: "center",
                            padding: -5,
                            margin:-1,
                        }}
                    >
                        <Text style = {tw`text-center mb-2`}>{item.name}</Text>
                        
                        <Equation equation = {item.expression}/>
                    </View>
        </ListItem>
    );
    const CourseButton = ({ iconName, courseName, courseCode  }) => (
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={() => {
          //setSelectedCourse(true);
          getData(courseCode);
          setSelectCourse(courseName);
          setModalVisible(true);
        }}
      >
        <Icon name={iconName} size={30} color="#FF0000"  />
        <Text style={tw`text-black text-center text-xs text-opacity-50`}>{courseName}</Text>
      </TouchableOpacity>
    );
    
    const getData = async(courseCode) => {
      const cheatsheetRef = collection(db,"cheatsheet");
      const q = query(cheatsheetRef, where("codeCourse", "==", courseCode));

      const querySnapshot = await getDocs(q);
      const formulas = [];
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const {codeCourse, course, expression, name, topic} = doc.data();
          //setEqu(doc.data().expression);
          
          formulas.push({
              id: doc.id,
              codeCourse: codeCourse,
              course: course,
              expression: expression,
              name: name,
              topic: topic,
          });
      });
      console.log(formulas);
      setFormulas(formulas);
      setFinalize(true);
  };
  


    return(
        <SafeAreaView style = {tw`bg-white h-full`}>   

                <HeaderComponent/>
                
                 <View style={styles.container}>
                  {courses.map((course, index) => (
                    <CourseButton key={index} iconName={course.icon} courseName={course.name} courseCode ={course.courseCode} />
                  ))}
                </View>

                <BannerAdGoogle/>
                <FooterComponent />
            
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
              <View style={tw`h-full w-full`}>
              <View style={styles.centeredView}>
              {isFinalize && <View style={styles.modalView}>
                  <Text style={tw`mb-2`}>{selectCourse}</Text>
                  <FlatList
                        keyExtractor={(item)=>item.id}
                        data = {formulas}
                        renderItem= {renderFormula}
                    />

                  
                  <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                        
                    >
                        <Text style={styles.textStyle}>Cerrar</Text>
                    </Pressable>
              </View>}
              {!isFinalize && <ActivityIndicator size={"large"}/>}
              </View>
              </View>
            </Modal>
        </SafeAreaView>
        
    );
};

export default CheatSheetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    margin: 3,
    backgroundColor: '#FDF5E6',
    borderRadius: 10,

  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
   
  },
  button: {
    borderRadius: 20,
    padding: 10,
    
    marginTop:10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
