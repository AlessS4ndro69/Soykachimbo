import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { View, Text, Alert } from "react-native"
import { Icon } from "react-native-elements"
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";


const FooterComponent = () => {
     
    const {_week, _setWeek} = useContext(UserContext);
   // const [week, setWeek] = useState(_week);
    const navigation = useNavigation();

    const week = _week;

    return (
        <View style ={tw`items-center`}>
            <Text>Semana: {week} </Text>
            <Slider
              style={{width:250, height: 30}}
              minimumValue={1}
              maximumValue={12}
              minimumTrackTintColor="tomato"
              maximumTrackTintColor="#000"
              thumbTintColor="tomato"
              value={week}
              onValueChange={(val) => {
                
                
                _setWeek(parseInt(val));  /// context
                }}
            />
            <Icon reverse
                                style = {tw` bg-blue-400 rounded-full w-10 mb-1`}
                                name = "camera"
                                color = "#1267F3"
                                type = "antdesign"
                                onPress = {() => navigation.navigate('OCR')}
                                //onPress={() => Alert.alert('Muy pronto nuevas funcionalidades!')}
            />
        </View>
    );
}

export default FooterComponent;

