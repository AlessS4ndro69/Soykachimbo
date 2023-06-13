import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { View, Text, Alert } from "react-native"
import { Icon } from "react-native-elements"
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";


const FooterComponent = () => {
     
    const {_week, _setWeek} = useContext(UserContext);
    const [week, setWeek] = useState(_week);
    const navigation = useNavigation();

    //const week = _week;

    return (
        <View style ={tw`items-center`}>
            <Text>Semana: {week} </Text>
            <Slider
              style={{width:250, height: 30}}
              minimumValue={3}
              maximumValue={12}
              minimumTrackTintColor="tomato"
              maximumTrackTintColor="#000"
              thumbTintColor="tomato"
              value={week}
              step = {1}
              onValueChange={(val) => { 
                setWeek((val));  ///  local scope 
                //_setWeek(parseInt(val)); /// context
                }}
              onSlidingComplete = {(val) =>{
                _setWeek((val)); /// context
              }}
            />
            <Icon reverse
                                style = {tw` bg-blue-400 rounded-full w-10 mb-1`}
                                name = "camera"
                                color = "#1267F3"
                                type = "antdesign"
                                onPress = {() => navigation.navigate('SearchStatementScreen')}
                                //onPress={() => Alert.alert('Muy pronto nuevas funcionalidades!')}
            />
        </View>
    );
}

export default FooterComponent;

