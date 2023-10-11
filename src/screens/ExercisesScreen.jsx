import { Text, View, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import ExerciseList from "../components/ExerciseList";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

import BannerAdGoogle from "../components/BannerAdGoogle";


const ExercisesScreen = () => {
    const route = useRoute();
    console.log(route.params.codeCourse);
    return (
        <SafeAreaView style = {tw`bg-white h-full `}>
            <HeaderComponent course ={route.params.course}/>
            <ExerciseList codeCourse = {route.params.codeCourse} buy = {route.params.buy}/>

            <BannerAdGoogle/>
            <FooterComponent onSlider = {true}/>
            <StatusBar style="auto" />
        </SafeAreaView>
        
        
    );
}

export default ExercisesScreen;