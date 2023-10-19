
import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Question from "../components/QuestionComponent";
import tw from "twrnc"
import PracticeList from "../components/PracticeListComponent";

const EvaluationScreen = () => {

    return (
        <SafeAreaView style = {tw`bg-white h-full pt-5 justify-center`}>
            {/*<Question/>*/}
            <PracticeList/>
        </SafeAreaView>
    );
};


export default EvaluationScreen;