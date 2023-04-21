import React, {useEffect, useContext} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';


import UserContext from '../context/UserContext';


const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg'



const InfoUserScreen = () =>{
    const {user, logout} = useContext(UserContext);
    const navigation = useNavigation();
    const profilePicture = 'https://robohash.org/' + user?.email;

    const toLogout = () => {
        console.log("logoutt....");
        logout();
        navigation.navigate('AuthSession');
    };

    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
        <View style={{width: 100, height: 100, backgroundColor: 'purple', position: 'absolute' }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'blue', top: 100, position: 'absolute', transform: [{rotate: '25deg'}] }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'red', bottom: 100 ,position: 'absolute', borderRadius: 50, transform: [{rotate: '50deg'}] }}></View>
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
          <BlurView intensity={100}>
            <View style={styles.login}>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>E-mail</Text>
                <Text style={styles.input}> {user?.email} </Text>
                
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Stars</Text>
                <Text style={styles.input}> {user?.countStars}</Text>
                
              </View>
              
              <TouchableOpacity onPress={() => navigation.navigate('ScanQRScreen')} style={styles}>
                <Image
                    style = {{width: 80, height: 80, resizeMode: "contain"}}
                    source = {{uri : 'https://cdn-icons-png.flaticon.com/512/4645/4645459.png'}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => {toLogout()}}  style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'red'}}>Logout</Text>
              </TouchableOpacity>
              
              
              
            </View>
          </BlurView>
        </ScrollView>
      </View>
    );
}

export default InfoUserScreen;

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: 550,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
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