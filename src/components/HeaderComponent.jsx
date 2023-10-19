import { useRef, useEffect, useState, useContext } from "react"
import UserContext from "../context/UserContext";
import { View, Text, TouchableOpacity, Image } from "react-native"
import LogoComponent from "./LogoComponent"
import { Icon as RNEIcon } from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HyperLinkComponent from "./HyperLinkComponent";
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


/*
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}
  
async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }
        if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }

    return token;
}
 */ 

const HeaderComponent = (props) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const navigation = useNavigation();
    const title = props.course; 

/*
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token);
            Alert.alert("your expo token: ",token);
            console.log("expo token: ",token);
        });
        
    },[]);*/
    return (
        <View style = {tw` flex-row items-center justify-around pt-3`}>
                    { !title && <LogoComponent/>}

                    { title && <View style = {tw`p-2 mb-2 bg-blue-500 rounded`}>
                                    <Text style = {tw` text-2xl italic  text-white font-bold`}>{title}</Text>
                                </View>}
                    <TouchableOpacity 
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('HomeScreen')}
                    >
                        <FAIcon 
                            name="home" size={20} color="#FF0000" 
                            
                        />
                        <Text style = {tw`text-xs text-black opacity-30`}>Inicio</Text>
                        
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('EvaluationScreen')}
                    >
                        <FAIcon 
                            name="book" size={20} color="#FF0000" 
                            
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('GeneralScreen',{
                                modeScreen : 1
                            }
                            
                        )}
                    >
                        <FAIcon 
                            name="file" size={20} color="#FF0000" 
                            
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('GeneralScreen',{
                                modeScreen:2
                        })}
                    >
                        <FA5Icon 
                            name="play-circle" size={20} color="#FF0000" 
                            
                        />
                        
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('CheatSheetScreen')}
                        disabled={true}
                    >
                        <FAIcon 
                            name="superscript" size={20} color="#FF0000" 
                            
                        />
                        
                    </TouchableOpacity>
                    
                    {/*<TouchableOpacity 
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('ScanQRScreen',{
                            mode: 2
                        })}
                    >
                        <MCIcon 
                            name="abacus" size={20} color="#FF0000" 
                            
                        />
                        
                    </TouchableOpacity>*/}
                      
                    
                    

                    <TouchableOpacity 
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('InfoUserScreen')}
                    >
                        <FAIcon 
                            name="user" size={20} color="#FF0000" 
                            
                        />
                        
                    </TouchableOpacity>  
                    
                    
        </View>
    );
}


export default HeaderComponent;

