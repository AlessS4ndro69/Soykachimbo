import {preguntas} from '../../preguntas.json';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, } from 'react-native-elements';
import tw from 'twrnc';

//const preguntas = _preguntas.preguntas;

const QuestionScreen = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [expandedKey, setExpanded] = useState(0);

  console.log(preguntas);
 
  console.log("len: ", preguntas.length);

  const handleRespuestaSeleccionada = (opcion) => {
    const respuestaActual = {
      pregunta: preguntas[preguntaActual].pregunta,
      respuesta: opcion,
    };

    setRespuestas([...respuestas, respuestaActual]);

    // Avanzar a la siguiente pregunta
    setPreguntaActual(preguntaActual + 1);
  };

  const renderPregunta = ({ item}) => (
    <ListItem.Accordion
      isExpanded={ expandedKey === item.id}
      onPress={() => {
        setExpanded(item.id);
        handleRespuestaSeleccionada;
      }}
      bottomDivider
      content={
        
          
          <ListItem.Content>
            <ListItem.Title>
                <Text style = {tw`italic text-base text-blue-300 `}>{item.pregunta}</Text>
            </ListItem.Title>
          </ListItem.Content>
        
      }
    >
      
      {item.opciones.map((item,key) => (
        <ListItem key={key}  bottomDivider>
        
        <ListItem.Content>
          <ListItem.Title><Text style = {tw`text-sm`}>{item}</Text></ListItem.Title>
          
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      ))}
      <ListItem.Chevron />

    </ListItem.Accordion>
  );

  return (
    <SafeAreaView>
    
        <FlatList
        
        data={preguntas}
        renderItem={renderPregunta}
        
        />

    
    </SafeAreaView>
  );
};

export default QuestionScreen;
