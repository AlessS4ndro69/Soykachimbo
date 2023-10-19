import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import {data} from "../../AreaList.json"

const NUMBERQUESTIONS = 5;

const PracticeList = () => {
    const navigation = useNavigation();

    const render = ({item}) => {
        return(
            <View style= {tw`flex-row p-2 pb-2 bg-gray-200 m-1  justify-between`}> 
                    <TouchableOpacity style = {tw`w-full `}
                    onPress={() => {
                        /*navigation.navigate('PaginationScreen',{
                            courseCode: item.courseCode,
                            courseTitle: item.title,
                        })*/
                        navigation.navigate('QuestionScreen',{
                            courseCode: item.courseCode,
                            numberQuestions: NUMBERQUESTIONS,
                        });
                    }}
                    >

                    <View style = {tw`items-center justify-around flex-row pl-6 ml-2`}>
                        <Image
                            style = {{width: 80, height: 80, resizeMode: "contain"}}
                            source = {{uri : item.image}}
                        />
                        <Text style= {tw` text-lg font-semibold`}> {item.title}</Text>
                        <View style = {tw``}>
                            <Icon
                                style = {tw`p-2 bg-black rounded-full w-10 ml-5`}
                                name = "arrowright"
                                color = "white"
                                type = "antdesign"
                            />
                            
                        </View>
                        
                    </View>
                    </TouchableOpacity>
                    
                </View>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={render}
            keyExtractor={(item) => item.courseCode}
        >       
        </FlatList>
    );
};


export default PracticeList;


