import { useState, useEffect, useContext } from "react";
import { FlatList, View, Text, TouchableOpacity, Image, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadStatementComponent from "../components/UploadStatementComponent";
import tw from "twrnc";
import {TYPESENSE_KEY} from "@env"

import UserContext from "../context/UserContext";
import OCR from "../components/OCR";
import ChatgptComponent from "../components/ChatgptComponent";
import { ScrollView } from "react-native-gesture-handler";
import BannerAdGoogle from "../components/BannerAdGoogle";



const SearchStatementScreen = () => {
    const [responseTypesense, setResponseTypesense] = useState([]);
    const [requestText, setRequestText] = useState('');
    const [imageOcr, setImageOcr] = useState('');
    const [uploadStatement, setUploadStatement] = useState(false);
    const [captureFilename, setCaptureFilename] = useState("");
    const [umbral, setUmbral] = useState(false);
    const [useChatgpt, setUseChatgpt] = useState(false);


    const navigation = useNavigation();
    const {buyOcr, user} = useContext(UserContext);
    
    
    const initialState = {
        course: null,
        codeCourse:null,
        week: null,
        captureImage: null,
        captureFilename: "",
      
        text: "",
        embeddingArray: null,
        resolution: null,   /////// puede haber varias propuestas de solucion
        sequence: null,
        solved: false
      };
      
    const [data, setData] = useState(initialState);
    
    

    const typesenseRequest = async() => {
        const options = {
            method: "GET",
            headers: {
                'X-TYPESENSE-API-KEY': TYPESENSE_KEY
            },
        }
        await fetch("https://ozp6k178lebiw5tap-1.a1.typesense.net:443/collections/statements/documents/search?q=".concat(requestText+'&query_by=text&limit_hits:4'),options)
        .then(res => res.json())
        .then(response => {
            console.log("Result of typesense: ",response.hits);
            setResponseTypesense(response.hits);

            /*
            if(requestText){ ///////// validacion del umbral para mostrar resultados de typesense
                console.log("tokens matched: ",response.hits[0].text_match_info.tokens_matched);
                console.log("len text: ",  requestText.split(" ").length);
                if(response.hits[0].text_match_info.tokens_matched > (0.6 * requestText.split(" ").length)){
                    console.log("se paso el umbral activando flag");
                    setUmbral(true);
                }
                
            }*/
        });

        

        /*
        await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        .then(res => res.json())
        .then(response => console.log(response));
        */
    };

    useEffect(() => {
        
        const initSearch = async() => {
            await typesenseRequest();
        };
        initSearch();
        

    },[requestText]); //// esperamos q OCR haga el escaneo y retorne el texto leido

    return (
        <SafeAreaView style={tw`p-2 mb-5 pb-5 items-center justify-between h-full`}>
            {/*requestText && <Text style = {tw`text-base font-black`}>Buscando: {requestText}</Text>*/}
            {imageOcr && requestText && <Image source={{ uri: imageOcr }} style={{alignItems:'center',width: 300, height: 100, margin:3}}/>}            
            {<Text style = {tw`text-base font-black`}> Ejercicios similares: </Text>}

            {!requestText && <View>
                                <OCR setRequest = {setRequestText} setImageOcr = {setImageOcr} setCaptureFilename={setCaptureFilename}/>
                            </View>}
            
            {requestText && !responseTypesense[0] && <Text style = {tw`text-base font-black`}> No se encontraron datos :/ </Text>}
            {requestText && <FlatList
                                style = {tw`p-2 mt-2 mb-1 h-100`}
                                data={responseTypesense}
                                //data = {data}
                                renderItem={({item}) => (
                                    <View style= {tw` p-2 bg-gray-200 m-2 rounded-md `}> 
                                        <TouchableOpacity
                                        onPress={() => {
                                
                                            
                                            if(user.countStars >= 10){
                                                if(item.document.solved){ // se cobra si tiene solution
                                                    buyOcr(10);   /// 10 stars price
                                                }
                                                navigation.navigate("ResultSearchScreen", {
                                                    refResolution: item.document.resolution,
                                                    refStatement: item.document.id
                                                });
                                            }else{
                                                Alert.alert("Necesitas recargar estrellas :)");
                                            }
                                            
                                          
                                            
                                          }}
                                        //style = {tw` p-2 pl-10 pb-4 bg-gray-200 m-2 w-9/12`}
                                        >
                                            <Text style= {tw` text-sm font-semibold`}>{item.document.text}</Text>
                                            <Text style= {tw`text-xs`}>Score: {item.text_match}</Text>
                                            <Text style= {tw`text-xs`}>Tokens matched: {item.text_match_info.tokens_matched}</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                )}
                                
                                />}
                                {!useChatgpt && <Button title="Usar Chatgpt" onPress={() => {
                                    if(user.countStars >= 10){
                
                                        setUseChatgpt(true);
                                    }
                                    else{
                                        Alert.alert("Necesitas recargar estrellas :)")
                                    } 
                                    
                                    }}/>}
                                {useChatgpt &&<Text style = {tw`text-base font-black`}> Propuesta de ChatGpt 3.5 por OpenAI:</Text>}
                                {requestText && useChatgpt && <ScrollView style = {tw` p-2 bg-gray-200 m-4 rounded-md pb-3`}>
                                    <ChatgptComponent requestText = {requestText}/>
                                </ScrollView>}
                                
                                {useChatgpt && requestText &&<Text style = {tw`text-base font-black`}>Nota: Se recomienda consultar con el docente la propuesta de ChatGpt, pues aún es una tecnología en constante evolución</Text>}
                                {requestText && uploadStatement && <UploadStatementComponent textOCR = {requestText} captureFilename = {captureFilename} imageOcr = {imageOcr} />}
                                {useChatgpt && requestText && !uploadStatement && <Button title ={"Necesito ayuda del profesor"} onPress={() => setUploadStatement(true)}/>}
                                <BannerAdGoogle/>
                                
        </SafeAreaView>
        
    ); 

};


export default SearchStatementScreen;