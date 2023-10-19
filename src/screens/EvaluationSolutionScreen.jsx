import React, {useEffect, useState} from "react";
import { Image, View, Text, SafeAreaView, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "twrnc";


const EvaluationSolutionScreen = ()=> {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [isFinish, setFinish] = useState(false);

    const route = useRoute();
    const solution = route.params.solution;

    const get_dimensions = ()=> {
        const imageUrl = solution;
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
        
            get_dimensions();
        
    },[]);

    return (
        <SafeAreaView style = {tw`bg-white h-full justify-center items-center p-5`}>
            <View style={{ flex: 1 }}>
            <ScrollView>
            {isFinish && <Image style={{ width: width, aspectRatio: width/height}}
                    source={{uri: solution}}/>}
            </ScrollView>
            </View>
        </SafeAreaView>

    );
};


export default EvaluationSolutionScreen;