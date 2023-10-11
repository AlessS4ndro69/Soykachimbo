import { useContext } from "react";
import UserContext from "../context/UserContext";
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Image,} from "react-native";
import tw from 'twrnc';

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import AreaList from "../components/AreaList";
import BodyComponent from "../components/BodyComponent";
import { useRoute } from "@react-navigation/native";
import BannerAdGoogle from "../components/BannerAdGoogle";


const GeneralScreen = () => {
    const route = useRoute();
    console.log("modescreen: ",route.params.modeScreen);
    return(
        <SafeAreaView style = {tw`bg-white h-full`}>   
                <HeaderComponent/>
                <BodyComponent modeScreen = {route.params.modeScreen}/>
                <BannerAdGoogle/>
                <FooterComponent onSlider = {false}/>
        </SafeAreaView>
        
    );
}

export default GeneralScreen;

const styles = StyleSheet.create({});