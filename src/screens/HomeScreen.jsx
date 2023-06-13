import { use } from "react";
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Image,} from "react-native";
import tw from 'twrnc';

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import AreaList from "../components/AreaList";



const HomeScreen = () => {
    
    
    return(
        <SafeAreaView style = {tw`bg-white h-full`}>   
            
            
            
                <HeaderComponent/>
          
                <AreaList/>
                <FooterComponent/>
            
            
        </SafeAreaView>
        
    );
}

export default HomeScreen;

const styles = StyleSheet.create({});