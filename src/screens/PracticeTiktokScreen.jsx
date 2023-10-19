import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Image, FlatList, ActivityIndicator, TouchableOpacity, Linking, SafeAreaView  } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ImageZoom from 'react-native-image-pan-zoom';
import { Icon } from 'react-native-elements';
import tw from "twrnc";
import { db } from "../../database/firebase";
import { doc, getDoc } from "firebase/firestore";
import BannerAdGoogle from "../components/BannerAdGoogle";
import PracticeList from "../components/PracticeListComponent";



const PracticeTiktokScreen = () => {

    return (
        <SafeAreaView style = {tw`bg-white h-full pt-5 mt-2`}>
            <PracticeList/>
        </SafeAreaView>
    );

    
};



export default PracticeTiktokScreen;