import React, {useEffect, useState} from "react";
import { View, Text, SafeAreaView, FlatList, ActivityIndicator, Image, Alert, Button, TouchableOpacity } from "react-native";
import MyButton from "../components/MyButtonComponent";
import { useRoute, useNavigation } from "@react-navigation/native";
import StarAnimation from "../components/StarAnimationComponent";
import tw from "twrnc";

const EvaluationResultScreen = () => {
    const [isFinish, setFinish] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [finishRevision, setFinishRevision] = useState(false);

    const route = useRoute();
    const navigation = useNavigation();

    const data = route.params.data;
    const correctAnswers = route.params.correctAnswers;

    console.log("data is: ",data );

    const handleQuestion = () => {
        if(questionNumber +1 < data.length){ //questinoNumber empieza en 0
            setQuestionNumber(questionNumber+1);
            setFinish(false);
        }else{
            Alert.alert("Has llegado a la última pregunta 😎😋");
            setFinishRevision(true);
        }
        
    };

    const render = ({item}) => {
        return(
        <View>
            <Text>Pregunta Nro {}</Text>
            
        </View>);
    };

    const get_dimensions = ()=> {
        const imageUrl = data[questionNumber].question;
        Image.getSize(imageUrl, (width, height) => {
            // Aquí puedes utilizar las dimensiones (width y height) de la imagen
            // para establecer el estilo de tu componente Image o realizar otras acciones.
            console.log(`Ancho: ${width}, Alto: ${height}`);
            setWidth(width);
            setHeight(height);
            setFinish(true);
          }, error => {
            // Manejo de errores en caso de que no se pueda obtener el tamaño de la imagen.
            console.error(`Error al obtener el tamaño de la imagen: ${error}`);
          });
    };
    useEffect(()=> {
        if(data.length > 0){
            get_dimensions();
        }
    },[questionNumber, data]);


    return (
        <SafeAreaView style = {tw`bg-white h-full justify-center items-center p-5`}>
            <StarAnimation/>
            <Text style = {tw` text-2xl italic text-black font-bold`}>Resultados</Text>
            <Text style = {tw` text-2xl italic text-black font-bold`}>Tienes {correctAnswers} aciertos</Text>
            {/*<FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={render}
    />*/}
            <View style = {tw `items-center`}>
                
                
                <View style = {tw`p-2 mb-2 bg-blue-500 rounded`}>
                    <Text style = {tw` text-2xl italic text-white font-bold`}>Pregunta {questionNumber+1}</Text>
                </View>
                {isFinish && <Image style={{ width: width * 1.2, aspectRatio: width/height}}
                    source={{uri: data[questionNumber].question}}/>}
                {!isFinish && <ActivityIndicator size="large" color="blue"/>}
                
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("EvaluationSolutionScreen", {
                    solution: data[questionNumber].solution,
                    });
                }}
                style={{
                    backgroundColor: 'transparent',
                }}
                >
                <Text style={{ textDecorationLine: 'underline' }}>
                    Solucionario
                </Text>
                </TouchableOpacity>


                {!finishRevision && <MyButton text = "Siguiente pregunta" onClick = {handleQuestion}/>}
                {finishRevision && <MyButton text = "Finalizar revision" onClick={()=>{
                    Alert.alert("Felicidades sigue acumulando victorias 🤭🦾🧠");
                    navigation.navigate("EvaluationScreen");
                }}/>}
                <Image style={{ width: 80, height: 80, resizeMode: "contain"}}
                    source={{uri: "https://cdn-icons-png.flaticon.com/128/4697/4697377.png"}}/>
            </View>
        </SafeAreaView>
    );
};


export default EvaluationResultScreen;