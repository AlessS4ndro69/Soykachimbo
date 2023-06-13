import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator} from "react-native";
import {CHATGPT_KEY} from "@env"


import tw from "twrnc";
import { Button } from "react-native-elements";

const ChatgptComponent = (props) => {
    const requestText = props.requestText;
    
    const [responseText, setResponseText] = useState("");
    const [loading, setLoading] = useState(true);
    
    const goChat = async() => {
        console.log("aca ira el request");

        const url = 'https://api.openai.com/v1/chat/completions';
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
            { role: 'user', content: requestText }
            ],
            temperature: 0.5
            
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + CHATGPT_KEY
        };
    
        fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            //console.log(responseData); // Maneja la respuesta de la API aquí
            console.log("mostrando resposne de chatgpt: ",responseData.choices[0].message.content);
            setResponseText(responseData.choices[0].message.content);
            setLoading(false);
        })
        .catch(error => {
            console.error(error); // Maneja los errores de la solicitud aquí
        });
        

    };
    
    useEffect(() => {
        setLoading(true);
        const fun = async() => {
            await goChat();
        };
        fun();
    },[]);

    return(
        
            <View style = {tw`justify-center items-center p-2`}>
            {loading && <ActivityIndicator size = {"large"}/>}
            {responseText && <Text>{responseText}</Text>}
            </View>
        
    );
};


export default ChatgptComponent;

  