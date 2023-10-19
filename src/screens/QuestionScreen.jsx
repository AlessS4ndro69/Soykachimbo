import React from "react";
import Question from "../components/QuestionComponent";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import tw from "twrnc";

const QuestionScreen = ()=>{
    const route = useRoute();
    const courseCode = route.params.courseCode;
    const numberQuestions = route.params.numberQuestions;
    console.log("props en questionScreen: ",route.params);
    

    return(
        <SafeAreaView style = {tw`bg-white h-full pt-5 mt-5 justify-center`}>
            <Question courseCode = {courseCode} numberQuestions = {numberQuestions}/>            
        </SafeAreaView>
    );

};


export default QuestionScreen;