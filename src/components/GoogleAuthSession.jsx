import { useState, useEffect } from 'react';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Image , TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import  Constants  from 'expo-constants';
import { makeRedirectUri } from 'expo-auth-session';



WebBrowser.maybeCompleteAuthSession();

const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@aless4ndro/soykachimbo' };
const NATIVE_REDIRECT_PARAMS = { native: "com.aless4ndro.soykachimbo://" };
const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = makeRedirectUri(REDIRECT_PARAMS);
//const redirectUri = makeRedirectUri(NATIVE_REDIRECT_PARAMS);

const GoogleAuthSession = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setLoading] = useState(false); 
    const [user,setUser] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "166149408149-pclatpuu2d4mmcgrpivapgkr9v64mmv0.apps.googleusercontent.com",
        iosClientId: "166149408149-95ap9g4til4997692d217ttk6rgdhmop.apps.googleusercontent.com",
        androidClientId: "166149408149-s3ugmpp5pdiakfd36v4gtaf45rk4ef19.apps.googleusercontent.com",
        redirectUri
    });

    useEffect(()=>{
        if(response?.type === "success"){
            setLoading(true);
            console.log(response);
            setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo();
            
        };
        
    },[response, accessToken]);

    const fetchUserInfo = async () => {
        
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
            headers: {
                Authorization: `Bearer ${accessToken}` 
            }
        });
        const userInfo = await response.json();
        setUser(userInfo);
        setLoading(false);
         

    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
        {user && <Text>Welcome</Text>}
        {user && <Image source={{uri: user.picture}} style= {{width: 100, height: 100}} />}
        {user && <Text>{user.name}</Text>}
        {!user && <TouchableOpacity
                disabled = {!request}
                onPress = {() => {
                    promptAsync(REDIRECT_PARAMS);
                    //promptAsync(NATIVE_REDIRECT_PARAMS);
                }}
            >
                <Text>Tocame papi pal login</Text>
            </TouchableOpacity>}
        {isLoading && <ActivityIndicator size="large" />}
        </View>

        
    );
}


export default GoogleAuthSession;