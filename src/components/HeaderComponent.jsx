import { View, Text } from "react-native"
import LogoComponent from "./LogoComponent"
import { Icon } from "react-native-elements"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"



const HeaderComponent = (props) => {
    const navigation = useNavigation();
    const title = props.course; 

    return (
        <View style = {tw` flex-row items-center justify-between pt-3 pl-15`}>
                    { !title && <LogoComponent/>}
                    { title && <View style = {tw`p-3 bg-blue-500 rounded`}>
                                    <Text style = {tw` text-2xl italic  text-white font-bold`}>{title}</Text>
                                </View>}
                            
                    <View style = {tw`ml-20`}>
                        <Icon reverse
                        style = {tw `bg-blue-500 rounded-full ml-18 w-10  p-2`}
                        name = "user"
                        color = "#1267F3"
                        type = "antdesign"
                        onPress={() => navigation.navigate('InfoUserScreen')}
                        />
                    </View>
                    
        </View>
    );
}


export default HeaderComponent;

