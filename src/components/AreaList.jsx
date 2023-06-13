import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";




const data = [
    /*{
        courseCode: 14,
        title: "Aritmética",
        image: "https://cdn-icons-png.flaticon.com/512/4718/4718999.png",
        //screen: "ExercisesScreen",
    },
   
    {
        courseCode: 16,
        title: "Geometría",
        image: "https://cdn-icons-png.flaticon.com/128/3206/3206158.png",
        //screen: "ExercisesScreen",
    },
    
    {
        courseCode: 12,
        title: "Geo. Anal.",
        image: "https://cdn-icons-png.flaticon.com/128/3206/3206158.png",
        //screen: "ExercisesScreen",
    },*/
    {
        courseCode: 11,
        title: "Trigonometría",
        image: "https://cdn-icons-png.flaticon.com/128/9978/9978999.png",
        //screen: "ExercisesScreen",
    },
    {
        courseCode: 10,
        title: "Raz. Mate. 1",
        image: "https://cdn-icons-png.flaticon.com/128/9041/9041926.png",
        //screen: "ExercisesScreen",
    },
    {
        courseCode: 17,
        title: "Psicotécnico",
        image: "https://cdn-icons-png.flaticon.com/128/6938/6938770.png",
        //screen: "ExercisesScreen",
    },
    {
        courseCode: 13,
        title: "Algebra",
        image: "https://cdn-icons-png.flaticon.com/128/2861/2861731.png",
        //screen: "ExercisesScreen",
    },
    
    {
        courseCode: 15,
        title: "Raz. Mate. 2",
        image: "https://cdn-icons-png.flaticon.com/128/9041/9041926.png",
        //screen: "ExercisesScreen",
    }
    
    
    
    
];


//////// price  53 average

let pay = false;



const AreaList = () => {
    const navigation = useNavigation();
    const {buyCourse, _week, coursesHolding, catalogue, priceExercise, priceCourse} = useContext(UserContext);
    

    const coincidencias = coursesHolding.filter((course) => course.week == _week );
    console.log('array de coincidencia: ', coincidencias);
    const price = priceCourse;    


    
    
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
                if(coincidencias.find((e) => e.codeCourse == element.courseCode  )){
                    return {...element, pay: true, price: price + Math.floor(Math.random()*(10))}
                }
                else{
                    return {...element, pay: false, price:  price + Math.floor(Math.random()*(10))}
                }
                
            })}

            keyExtractor = {(item) => item.courseCode}
            renderItem={({ item }) => (
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
                    { !item.pay &&
                    <TouchableOpacity 
                        
                        style = {tw`bg-gray-200 mr-2` } 
                        onPress={() => {
                            buyCourse(item.courseCode, item.price , _week); 
                            navigation.navigate('HomeScreen');
                            }
                            
                        }>
                        
                        <View style={tw `pt-2`}>
                            <Image
                                style = {{width: 50, height: 50, resizeMode: "contain"}}
                                source = {{uri : 'https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/256/external-coin-ecommerce-xnimrodx-lineal-color-xnimrodx.png'}}
                            />
                            <Text style= {tw` font-semibold`}> {item.price} stars</Text>  
                        </View>
                    </TouchableOpacity>}
                </View>
                
            )}
        />
        
    );
}

export default AreaList;