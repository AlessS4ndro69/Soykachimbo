import { View, Text, TouchableOpacity, Image } from "react-native"
import LogoComponent from "./LogoComponent"
import { Icon } from "react-native-elements"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"



const HeaderComponent = (props) => {
    const navigation = useNavigation();
    const title = props.course; 

    return (
        <View style = {tw` flex-row items-center justify-around pt-3`}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ScanQRScreen',{
                            mode: 2
                        })}
                    >
                        <Image 
                            style = {{
                                width: 60,
                                height: 60,
                                resizeMode: "contain",
                                margin: 13  ,
                                padding: 3
                            }}
                            source = {{
                                uri: "https://cdn-icons-png.flaticon.com/512/936/936568.png?w=740&t=st=1682827591~exp=1682828191~hmac=7d3ea535d8c5e78e41ec80389b98d97a18726a4a405e039051966beff946c2bd",
                            }}

                        />
                    </TouchableOpacity>      
                    { !title && <LogoComponent/>}
                    { title && <View style = {tw`p-3 bg-blue-500 rounded`}>
                                    <Text style = {tw` text-2xl italic  text-white font-bold`}>{title}</Text>
                                </View>}
                      
                    <View style = {tw`justify-end`}>
                        <Icon reverse
                        style = {tw `bg-blue-500 rounded-full `}
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

