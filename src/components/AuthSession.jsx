import React, {useEffect, useState, useContext} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';

import UserContext from '../context/UserContext';

import firebase from '../../database/firebase';
import { useNavigation } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { db } from '../../database/firebase';

//const db = getFirestore(firebase);
const COLLECTIONUSERS = 'users';
const COLLECTIONSTARS = 'users_stars';

const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg'
let profilePicture = 'https://i.pinimg.com/originals/f8/37/13/f83713c369bd8e4422db28d802e5c4ff.png'


async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    //alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    //alert('No values stored under that key.');
    return null;
  }
}


const AuthSession = () =>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [uid, setUid] = useState(null);
    const [goLogin, setGoLogin] = useState(false);
    const [goRegister, setGoRegister] = useState(false);

    const navigation = useNavigation();
    const {login, setAssets} = useContext(UserContext);

    const app = firebase;
    const auth = getAuth(app);
    
    

    if(email){
      profilePicture = 'https://robohash.org/' + email;
    } 
    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!')
        const user = userCredential.user;
        console.log(user.uid);
        saveNewUser(user.uid);
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }

    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!');
        const user = userCredential.user;
        console.log(user.uid);
        //setUid(user.uid);
        getUser(user.uid);
        navigation.navigate('HomeScreen');
        
      })
      .catch(error => {
        Alert.alert("Usuario no existe");
        console.log(error);
      })
    }

    const saveNewUser = async(uid) => {
      ////////// ----------- CREATE REFERENCE TO STARS ----------- /////////
      const refDoc = await addDoc(collection(db, COLLECTIONSTARS), {
        countStars: 0
      });

      const refHolding = await addDoc(collection(db,'users_holding'), {
        exercisesHolding: [],
        coursesHolding: []
      });

      
      await setDoc(doc(db, COLLECTIONUSERS,uid), {
        email: email,
        uid: uid,
        refStars: refDoc.id,
        refHolding: refHolding.id
      });
      //console.log("Document written with ID: ", docRef);
      getUser(uid);
    };

    const getUser = async(uid) => {

      console.log('ingreso a getuser');
      const docRef = doc(db,COLLECTIONUSERS,uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        
        const user = docSnap.data();
        console.log('user: ',user);
        const refStars = doc(db, COLLECTIONSTARS, user.refStars);  //// OBTENIENDO CANTIDAD DE STARS
        const docuStars = await getDoc(refStars);
        console.log(docuStars.data());

        const  refHolding = doc(db, 'users_holding', user.refHolding );
        const docuHolding = await getDoc(refHolding);

        ////////// ASSETS DEL APP PARA CONTROLAR COMPORTAMIENTO Y AGREGAR ELEMENTOS A HOMESCREEN ///////
        const refAssets = doc(db, "assets","assets");
        const docAssets = await getDoc(refAssets);
        const assets = docAssets.data();

        const refCategories = doc(db, "assets", "assets_categories");
        const docCategories = await getDoc(refCategories);
        const categories = docCategories.data();

        const refNews = doc(db, "assets", "assets_news");
        const docNews = await getDoc(refNews);
        const news = docNews.data();

        const refAdidas = doc(db, "assets", "assets_adidas");
        const docAdidas = await getDoc(refAdidas);
        const adidas = docAdidas.data();

        //////////// TERMINO DE LLAMADO DE ASSETS     //////////////


        setAssets({...assets,...categories,...news,...adidas});
        
        //////// set User in context
        const countStars = docuStars.data().countStars;
        const exercisesHolding = docuHolding.data().exercisesHolding;
        const coursesHolding = docuHolding.data().coursesHolding;

        login({...user, countStars: countStars, exercisesHolding: exercisesHolding, coursesHolding: coursesHolding});
        save("uid", uid);
        
      }else{
        console.log('user no existe');
      }
      
      
      
    };
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log('Error checking for updates:', error);
      }
  };

    useEffect(() => {
      //setGoLogin(false);
      //setGoRegister(false);
      const f = async() => {
        const userid = await getValueFor("uid");
        if(userid){
          console.log("existe value para  uid");
          setUid(userid);
          getUser(userid);
          
          navigation.navigate('HomeScreen');
          
          
        }
        console.log("estamos en efect de auth");
      };
      f();
      checkForUpdates();

    },[]);

    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
        <View style={{width: 100, height: 100, backgroundColor: 'purple', position: 'absolute' }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'blue', top: 120, position: 'absolute', transform: [{rotate: '25deg'}] }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'red', bottom: 120 ,position: 'absolute', borderRadius: 50, transform: [{rotate: '50deg'}] }}></View>
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
          <View>
            {!goLogin && !goRegister && <View style={styles.login}>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <TouchableOpacity onPress={()=>{setGoLogin(true)}} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Iniciar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGoRegister(true)} style={[styles.button, {backgroundColor: '#6792F090'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>}

            { goLogin && <View style={styles.login}>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <View>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>E-mail</Text>
                  <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="user@domain.com" />
                </View>
                <View>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
                  <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password" secureTextEntry={true}/>
                </View>
                <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Ingresar</Text>
                </TouchableOpacity>
              </View>}
            { goRegister && <View style={styles.login}>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <View>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>E-mail</Text>
                  <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="user@domain.com" />
                </View>
                <View>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
                  <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password" secureTextEntry={true}/>
                </View>
                
                <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#6792F090'}]}>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Ingresar</Text>
                </TouchableOpacity>
              </View>}

          </View>
        </ScrollView>
      </View>
    );
}

export default AuthSession;

  
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
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 130,
    height: 100,
    borderRadius: 10,
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