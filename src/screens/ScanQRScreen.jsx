import { useState, useEffect } from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View, Button, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import UpdateStarsComponent from "../components/UpdateStarsComponent";
import ScanQrComponent from "../components/ScanQrComponent";
import FileQrScreen from "./FileQrScreen";
import StarAnimation from "../components/StarAnimationComponent";
import BannerAdGoogle from "../components/BannerAdGoogle";



///// modelo de data que sera escaneada    'jasdofijasdjfafd/210'
const ScanQRScreen = (props) => {
  ///// mode 1 recharge stars, mode 2 scan practice file
  const route = useRoute();
  const mode1 = route.params.mode == 1;
  const mode2 = route.params.mode == 2;   
  console.log("mode scan: ",route.params.mode);
  
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const [text, setText] = useState('nF5KEEZ6F5suKmVJOmcn/210');
  const [text, setText] = useState('');
  const [info, setInfo] = useState('No info');
  
  
/*
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(text.split(' '));
    setScanned(true);
    setText(data);
    setInfo('Type: ' + type + '\nData: ' + data);
    
    console.log('Type: ' + type + '\nData: ' + data);
    console.log(text.split('/'));
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }*/


    return (
      <SafeAreaView style={tw `items-center bg-white h-full`}>
        <View style={tw `items-center`}>
            {/*<View style={styles.barcodebox}>
              <BarCodeScanner onBarCodeScanned = {scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }} />
              </View>*/}
            {!text && <ScanQrComponent text = {text} setText = {setText}/>}
            {text && < Text style={tw`text-base font-black`}>Data: {text}</Text>}
            {/*<Text style={styles.maintext}>Id: {text.split('/')[0]}</Text>*/}
            {/*<Text style={styles.maintext}>Count: {text.split('/')[1]}</Text>*/}
            {/*<Text style={styles.maintext}>Entero: {parseInt(text.split('/')[1])}</Text>*/}
            {/*<Text style={styles.maintext}>Info: {info} </Text>            */}
           
        </View>
        {text && mode1 && <UpdateStarsComponent id={text.split('/')[0]} quantityStars = {text.split('/')[1]}/>}

        {text && mode2 && <FileQrScreen codeCourse = {text.split('/')[0]} week = {text.split('/')[1]}/>}
        {mode1 && <Text style={tw`text-center text-black text-opacity-50`}> Escanea el código QR para recargar estrellas, estrellas gratis todos los Miércoles.</Text>}
        {/*mode1 && <StarAnimation/>*/}
        {mode2 && <Text style={tw`text-center text-black text-opacity-50 `}> Escanea el código QR de la práctica deseada.</Text>}
        {/* mode2 && <FileQrScreen codeCourse = {12} week = {23}/>*/}
        
        <BannerAdGoogle/>
      </SafeAreaView>     
    );
};

export default ScanQRScreen;


const styles = StyleSheet.create({
    input: {
        width: 90,
        height: 90,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20
      },
});