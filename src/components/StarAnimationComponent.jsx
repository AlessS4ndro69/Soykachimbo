import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Text, Animated, Easing, View, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Svg, { Path } from 'react-native-svg';
import moment from 'moment';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';



const dayOfWeek = moment().format('dddd');
const dateOfMonth = moment().date();
const BlackFriday = 3; /// 0 Domingo, 1 LUnes, ....  /// agregar a firebase
//let date = "";

const weekInSpanish = {
  Sunday: "Domingo",
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado"
};
const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};
const getRandomAnimation = () => {
  const animations = ['fadeIn', 'fadeOut', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideInDown'];
  return animations[Math.floor(Math.random() * animations.length)];
};

const StarAnimation = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [numberStars, setNumberStars] = useState(0);
  const [claimAprize, setClaimAprize] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [dateStorage, setDateStorage] = useState(0);
  const [goAnimation, setGoAnimation] = useState(false);
 


  const startAnimation = () => {
    if(numberStars < 3){
      setNumberStars(numberStars+1);
    }else{
      setClaimAprize(true);
      setDisabledButton(false);
      setGoAnimation(false);
      const position = moment().day(dayOfWeek).isoWeekday();
      const nextMonday = moment().day(3).add(1, 'weeks'); ////// 1 Lunes , 2 Martes 3 Miercoles....
      //console.log(nextMonday); 
      //console.log(nextMonday.day());  //// number 1=Lunes,...
      console.log(nextMonday.format('dddd')); // string con nombre del dia en ingles
      AsyncStorage.setItem('BlackFriday', JSON.stringify( nextMonday.date()));
    }
    
    
    setAnimationStarted(true);
    setTimeout(() => {
      setAnimationStarted(false);
    }, 2000);
  };

  const smallStars = Array.from({ length: 5 }).map((_, index) => (
    <Animatable.View
      key={index}
      animation={animationStarted ? getRandomAnimation() : null}
      duration={2000}
      easing="linear"
      useNativeDriver
      style={{
        position: 'absolute',
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: '#FCC419',
        transform: [{ translateX: getRandomValue(-50, 50) }, { translateY: getRandomValue(-50, 50) }],
      }}
    />
  ));

  useEffect(()=>{
    
    const f = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
    
        if (value === null || value === undefined) {
          console.log(`No existe valor para la clave "${key}".`);
          const nextDay = moment().day(3).add(1, 'weeks'); ////// 1 Lunes , 2 Martes 3 Miercoles....
          AsyncStorage.setItem('BlackFriday', JSON.stringify( nextDay.date()));
        } else {
          console.log(`El valor para la clave "${key}" es:`, value);
          setDateStorage(value);
        }
      } catch (error) {
        console.log('Error al validar el valor:', error);
      }
    };
    
    f('BlackFriday');
  });

  

  return (
    <View>
    <Text style={tw`text-center text-black text-opacity-50`}>Hoy es {weekInSpanish[dayOfWeek]}</Text>
    <Text style={tw`text-center text-black text-opacity-50`}>Ganaste: {numberStars} estrellas</Text>
    {/* !claimAprize && !goAnimation && <TouchableOpacity 
                      style = {[styles.button, {backgroundColor: '#00CFEB90'}]}
                      onPress = {()=>{
                        AsyncStorage.setItem('BlackFriday', JSON.stringify(18));

                      }} 
                      
                    >
                      <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Set day</Text>
                    </TouchableOpacity>*/}
    {!claimAprize && !goAnimation && <TouchableOpacity 
                      style = {[styles.button, {backgroundColor: '#00CFEB90'}]}
                      onPress = {()=>{
                        console.log("iniciando");
                        if(dateStorage != moment().date()){
                          Alert.alert("Hoy es " + weekInSpanish[dayOfWeek] + moment().date()+ ", reclama estrellas el dia " +weekInSpanish[moment().day(BlackFriday).format('dddd')] + dateStorage);
                        }else{
                          setGoAnimation(true);
                        }

                      }} 
                      
                    >
                      <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Quiero estrellas</Text>
                    </TouchableOpacity>}
    {goAnimation && <TouchableOpacity onPress={startAnimation}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animatable.View
          animation={animationStarted ? 'shake' : null}
          duration={1000}
          useNativeDriver
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Svg width={90} height={90} viewBox="0 0 24 24">
            <Path
              d="M12 2l3.09 6.31 6.9.99-5 4.86 1.18 6.88L12 18.18 5.82 21.04l1.18-6.88-5-4.86 6.9-.99L12 2zm0 10l-3.09 1.67.75-3.63-2.59-2.38 3.6-.31L12 4l1.33 2.35 3.6.31-2.59 2.38.75 3.63L12 12z"
              fill="#FCC419"
            />
          </Svg>
        </Animatable.View>
        {animationStarted && smallStars}
      </View>
      
    </TouchableOpacity>}
    {claimAprize && <TouchableOpacity 
                      style = {[styles.button, {backgroundColor: '#00CFEB90'}]}
                      onPress = {()=>{
                        console.log("reclamando");
                        setDisabledButton(!disabledButton);
                      }} 
                      disabled = {disabledButton}
                    >
                      <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Reclamar estrellas</Text>
                    </TouchableOpacity>}
    
    </View>
  );
};

export default StarAnimation;

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