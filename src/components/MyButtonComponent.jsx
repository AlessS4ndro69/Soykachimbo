import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import tw from "twrnc";


const MyButton = ({onClick, text}) => {
    return(
        <TouchableOpacity 
                onPress={onClick} 
                style={[styles.button, {backgroundColor: '#3B82F6'}]}>
                <Text style = {tw` text-xl italic text-white font-bold`}>{text}</Text>
                
              </TouchableOpacity>
    );
};

export default MyButton;

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
      }
});