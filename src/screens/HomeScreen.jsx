import { use, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import UserContext from "../context/UserContext";
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Image,} from "react-native";
import tw from 'twrnc';
import PencilAnimation from "../components/PencilAnimationComponent";


import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import AreaList from "../components/AreaList";
import PubComponent from "../components/PubgComponent";
import NewsComponent from "../components/NewsComponent";
import CategoriesComponent from "../components/CategoriesComponent";
import { Slider } from "react-native-elements";
import ShareAppButton from "../components/ShareAppButton";







const HomeScreen = () => {
    const {news, categories} = useContext(UserContext); 
    
    console.log("news: ",news);

    

    return(
        <SafeAreaView style = {tw`bg-white h-full`}>   
            <HeaderComponent/>
                <ScrollView>    
                
                <PubComponent/>
                <NewsComponent/>
                <CategoriesComponent/>
                <ShareAppButton/>
            
                </ScrollView>
            <FooterComponent onSlider = {false}/>
            <StatusBar style="auto" />
        </SafeAreaView>
        
    );
}

export default HomeScreen;

const styles = StyleSheet.create({});