import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, Linking, ActivityIndicator } from "react-native";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import {useRewardedInterstitialAd, TestIds, InterstitialAd} from 'react-native-google-mobile-ads';

import {data} from "../../AreaList.json";
import { where, getDocs,updateDoc, getDoc, getFirestore, collection, doc, query, onSnapshot, initializeFirestore } from "firebase/firestore";
import firebase from "../../database/firebase";
import { db } from "../../database/firebase";

//const db = getFirestore(firebase);

const coursesRef = collection(db,"courses");

const initialState = {
    code: 0,
    course: "",
    department: "",
    url_libros: "",
    url_videos: ""
};

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-4929040887239501/1256636808';

const BodyComponent = (props) => {
    const [dataCourses, setDataCourses] = useState(initialState);
    const [isFinalize, setFinalize] = useState(false);
    const [uriVideo, setUriVideo] = useState("");
    const [uriBook, setUriBook] = useState("");

    const modeScreen = props.modeScreen;
    console.log("recibiendo pop: ",modeScreen);
    const navigation = useNavigation();

    const {isLoaded, isClosed, load, show, isEarnedReward} = useRewardedInterstitialAd(adUnitId, {
        requestNonPersonalizedAdsOnly: true
      });

    
    

    const handleLinkPress = (url) => {
        console.log("presiono link");
        Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
      };

    const render = ({item}) => {
        return (
        <View style= {tw`flex-row p-2 pb-2 bg-gray-200 m-1 w-full justify-between`}> 
            <TouchableOpacity
                onPress={() => {
                    
                    if (isLoaded) {
                        setUriBook(item.url_libros);
                        setUriVideo(item.url_videos);
                        show();
                    }else{
                        if (modeScreen == 2){
                            handleLinkPress(item.url_videos);
                        }
                        if (modeScreen == 1){
                            handleLinkPress(item.url_libros);
                        }
                    }
                }}
            >

            <View style = {tw`items-center flex-row pl-6 ml-2`}>
                <Image
                    style = {{width: 30, height: 30, resizeMode: "contain"}}
                    source = {{uri : item.image}}
                />
                
            
                    {modeScreen == 2 && <Text style= {tw` text-lg font-semibold`}> Videos de {item.title}</Text>}
                    {modeScreen == 1 && <Text style= {tw` text-lg font-semibold`}> Libros de {item.title}</Text>}
                    {modeScreen == 2 && <FA5Icon style = {tw`m-2`}
                            name="play-circle" size={20} color="#FF0000" 
                            
                    />}
                    {modeScreen == 1 && <FA5Icon style = {tw`m-2`}
                            name="file" size={20} color="#FF0000" 
                            
                    />}
                
            </View>
            </TouchableOpacity>
            
        </View>
        
    )};

    useEffect(()=>{
        const f = async() => {
            const querySnapshot = await getDocs(coursesRef);
            const dataCourses = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const {code, course, department, url_libros, url_videos} = doc.data();
                dataCourses.push({
                    id: doc.id,
                    code: code,
                    course: course,
                    department: department,
                    url_libros: url_libros,
                    url_videos: url_videos
                });
                //console.log(doc.id, " => ", doc.data());

            });
            setDataCourses(dataCourses);
            setFinalize(true);
            console.log(dataCourses);

        
        };
        f();
    },[]);

    useEffect(() => {
        // Start loading the interstitial straight away
        load();
    }, [load, isEarnedReward, isClosed]);

    useEffect(() => {
        if (isEarnedReward) {
          // Action after the earnedReward
          //navigation.navigate('NextScreen');
            if (modeScreen == 2){
                handleLinkPress(uriVideo);
            }
            if (modeScreen == 1){
                handleLinkPress(uriBook);
            }
        }
      }, [isEarnedReward, navigation]);

    if(isFinalize){
        return(
            <FlatList
            
            data={data.filter((element) => {
                const foundCourse = dataCourses.find((e) => e.code === element.courseCode);
                return foundCourse; // Devuelve true si se encontró un curso correspondiente.
              }).map((element)=>{
                    const foundCourse = dataCourses.find((e) => e.code == element.courseCode);
                    return{...element, url_videos: foundCourse.url_videos, url_libros: foundCourse.url_libros}
              })}

    
    
                keyExtractor = {(item) => item.courseCode}
                renderItem = {render}
            />
        );
    }
    return (<ActivityIndicator size={"large"}/>);
    
};


export default BodyComponent;