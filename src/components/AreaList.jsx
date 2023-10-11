import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import {data} from "../../AreaList.json"

let pay = false;

const AreaList = () => {
    const navigation = useNavigation();
    const {buyCourse, _week, coursesHolding, catalogue, priceExercise, priceCourse} = useContext(UserContext);
    

    const coincidencias = coursesHolding.filter((course) => course.week == _week );
    console.log('array de coincidencia: ', coincidencias);
    const price = priceCourse;    
    //console.log("catalogue: por course y semana", catalogue["code_"+11]["week_"+_week]["number_exercises"]);

    
    
    //console.log(data.map(function (element){
    //    return {...element, pay: true}
    //}));
    
    //console.log(catalogue["code_10"]["week_"+_week]["number_exercises"]? catalogue["code_10"]["week_"+_week]["number_exercises"] : 0);
    //console.log("catalogue: ",catalogue);

    return (
        <FlatList
            //data={data}

            ////// se modifica la data con los cursos comprados
            data = {data.map(function (element){
                let number_exercises;
                if(catalogue["code_"+element.courseCode]){
                    number_exercises = catalogue["code_"+element.courseCode]["week_"+_week]?.number_exercises;
                    console.log("n exercises ", number_exercises);
                }else{
                    number_exercises = 0;
                }
                
                
                if(coincidencias.find((e) => e.codeCourse == element.courseCode  )){
                    return {...element, isVisible: number_exercises !==0, pay: true, price: price? price + Math.floor(Math.random()*(10)): 0 }
                    //return {...element, pay: true, price: price }
                }
                else{
                    return {...element,isVisible: number_exercises !==0, pay: false, price: price? price + Math.floor(Math.random()*(10)): 0}
                    //return {...element, pay: false, price: price}
                }
                
            })}

            keyExtractor = {(item) => item.courseCode}
            renderItem={({ item }) => {
                if(!item.isVisible){
                    return null;
                }
                return (
                <View style= {tw`flex-row p-2 pb-2 bg-gray-200 m-1 w-full justify-between`}> 
                    <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ExercisesScreen',{
                            codeCourse: item.courseCode,
                            course: item.title,
                            
                        })
                    }}
                    
                    //style = {tw` p-2 pl-10 pb-4 bg-gray-200 m-2 w-9/12`}
                    >

                    <View style = {tw`items-center flex-row pl-6 ml-2`}>
                        <Image
                            style = {{width: 80, height: 80, resizeMode: "contain"}}
                            source = {{uri : item.image}}
                        />
                        <View style = {tw`pl-3`}>
                            <Text style= {tw` text-lg font-semibold`}> {item.title}</Text>
                            <Icon
                                style = {tw`p-2 bg-black rounded-full w-10 ml-5`}
                                name = "arrowright"
                                color = "white"
                                type = "antdesign"
                            />
                            
                        </View>
                        
                    </View>
                    </TouchableOpacity>
                    {/* !item.pay &&
                    <TouchableOpacity 
                        disabled = {!item.isVisible}
                        style = {tw`bg-gray-200 mr-2` } 
                        onPress={() => {
                            //navigation.navigate('HomeScreen');
                            navigation.navigate('ExercisesScreen',{
                                codeCourse: item.courseCode,
                                course: item.title,
                                buy: true
                            })
                            buyCourse(item.courseCode, item.price , _week); 
                            
                            }
                            
                        }>
                        
                        <View style={tw `pt-2`}>
                            <Image
                                style = {{width: 50, height: 50, resizeMode: "contain"}}
                                source = {{uri : 'https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/256/external-coin-ecommerce-xnimrodx-lineal-color-xnimrodx.png'}}
                            />
                            <Text style= {tw` font-semibold`}> {item.price} stars</Text>  
                        </View>
                    </TouchableOpacity>*/}
                </View>
                
            )}}
        />
        
    );
}

export default AreaList;