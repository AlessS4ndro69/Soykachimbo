
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Image,} from "react-native";
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";


import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import AreaList from "../components/AreaList";
import BannerAdGoogle from "../components/BannerAdGoogle";





const SolverScreen = () => {
    
    
    return(
        <SafeAreaView style = {tw`bg-white h-full`}>   
            
            
            
                <HeaderComponent/>
                
                <AreaList/>
                <BannerAdGoogle/>
                <FooterComponent onSlider = {true}/>
            
                <StatusBar style="auto" />
        </SafeAreaView>
        
    );
}

export default SolverScreen;


const styles = StyleSheet.create({});