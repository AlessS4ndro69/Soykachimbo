import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { View, Text, Alert } from "react-native"
import { Button, Icon } from "react-native-elements"
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";



const FooterComponent = (props) => {
     
    const {_week, _setWeek} = useContext(UserContext);
    const [week, setWeek] = useState(_week);
    const navigation = useNavigation();
    

    
    //const week = _week;

    return (
      
        <View style ={tw`items-center`}>
            {/*<Text>Semana: {week} </Text>*/}
            {props.onSlider && <Text>Semana: {_week} </Text>}
            {props.onSlider && <Slider
              style={{width:250, height: 30}}
              minimumValue={1}
              maximumValue={16}
              minimumTrackTintColor="tomato"
              maximumTrackTintColor="#000"
              thumbTintColor="tomato"
              //value={week}
              value={_week}
              step = {1}
              onValueChange={(val) => { 
                setWeek((val));  ///  local scope 
                //_setWeek(parseInt(val)); /// context
                }}
              onSlidingComplete = {(val) =>{
                _setWeek((val)); /// context
              }}
            />}
            {/*
            <Icon reverse
                                style = {tw` bg-blue-400 rounded-full w-10`}
                                name = "camera"
                                //color = "#1267F3"
                                color= "#FF0000"
                                type = "antdesign"
                                onPress = {() => navigation.navigate('SearchStatementScreen')}
                                //onPress={() => Alert.alert('Muy pronto nuevas funcionalidades!')}
            />*/}
            
            
            {/*<Button
              onPress={()=>navigation.navigate("QuestionScreen")}
              title={"Cuestionario"}
            />*/}
        </View>
          
        
    );
}

export default FooterComponent;

