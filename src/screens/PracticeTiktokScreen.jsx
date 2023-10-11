import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Image, FlatList, ActivityIndicator, TouchableOpacity, Linking  } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ImageZoom from 'react-native-image-pan-zoom';
import { Icon } from 'react-native-elements';
import tw from "twrnc";
import { db } from "../../database/firebase";
import { doc, getDoc } from "firebase/firestore";
import BannerAdGoogle from "../components/BannerAdGoogle";

const screenHeight = Dimensions.get('window').height*0.90;
const screenWidth = Dimensions.get('window').width *0.90;

const handleLinkPress = (url) => {
    console.log("presiono link");
    Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
  };

const PracticeTiktokScreen = () => {
    const [images, setImages ] = useState([]);
    const [pdf, setPdf] = useState("");
    const [isFinish, setFinish] = useState(false);
    const [presentImage, setPresentImage] = useState(0);
    const [loading, setLoading] = useState(true);

    const pagination = (direction) => {
        if(direction == "left"){
            if(presentImage > 0){
                setPresentImage(presentImage-1);
            }
        }
        if(direction == "right"){
            if(presentImage < images.length){
                setPresentImage(presentImage+1);
            }
        }
        setLoading(true);
    };

    const render = ({item}) => {
        return (
            
            <ImageZoom cropWidth={screenWidth}
                    cropHeight={screenHeight*0.8}
                    imageWidth={340}
                    imageHeight={510}>
                    <Image style={{ width: 340, height: 510}}
                    source={{uri: item}}/>
                    </ImageZoom>
            
        );
    };

    useEffect(()=> {
        const fetch_firebase = async() => {
            const docRef = doc(db,"practices_for_tiktok","RHuy5vPSQ2xoqkSXXHzE");
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const data = docSnap.data();
                setImages(data.images);
                setPdf(data.uri_pdf);
                setFinish(true);
            }
        };
        fetch_firebase()
    },[]);


    return (
        <SafeAreaProvider>
            <View style= {tw`bg-white pt-5 h-full items-center `}>
                <Text style = {tw` p-1 text-xl text-blue-700 font-bold`}>Pagina: {presentImage+1}</Text>
                {/*isFinish && <FlatList
                    data={images}
                    keyExtractor = {(item) => item}
                    renderItem={render}
                />*/}
                {isFinish && <ImageZoom cropWidth={screenWidth}
                    cropHeight={screenHeight*0.8}
                    imageWidth={screenWidth}
                    imageHeight={screenWidth*1.5}>
                    {loading && <ActivityIndicator size="large" color="blue" style={{ transform: [{ scale: 1.2 }] }} />
}
                    <Image 
                        style={{ width: screenWidth, height: screenWidth*1.5}}
                        source={{uri: images[presentImage]}}
                        onLoad={()=> setLoading(false)}
                    />
                    </ImageZoom>}
                    
                    <View style = {tw`flex-row place-content-end`}>
                    <View style={tw`flex-1`}>
                    <Icon
                        name='chevron-left'
                        type='font-awesome'
                        size={30}
                        color='blue'
                        onPress={() => {
                        // Lógica cuando se presiona la flecha izquierda
                        console.log('Flecha izquierda presionada');
                        pagination("left");
                        }}
                    />
                    </View>
                    <View style={tw`flex-1`}>
                     <Icon
                        name='chevron-right'
                        type='font-awesome'
                        size={30}
                        color='blue'
                        onPress={() => {
                        // Lógica cuando se presiona la flecha derecha
                        console.log('Flecha derecha presionada');
                        pagination("right");
                        }}
                    />
                    </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => { handleLinkPress(pdf) }}
                        style={{
                            
                            borderRadius: 10, // Borde redondeado
                            padding: 1, // Espacio interno
                            alignItems: 'center', // Centrar contenido horizontalmente
                            borderColor: 'blue',
                            
                        }}
                        >
                        <Text style = {tw` text-xl text-blue-700 font-bold`}>Descargar PDF</Text>
                        </TouchableOpacity>
                        <BannerAdGoogle/>

            </View>
        </SafeAreaProvider>
    );

    
};



export default PracticeTiktokScreen;