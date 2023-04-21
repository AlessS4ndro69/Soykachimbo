import { useState, useEffect } from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import UpdateStarsComponent from "../components/UpdateStarsComponent";



///// modelo de data que sera escaneada    'jasdofijasdjfafd/210'
const ScanQRScreen = (props) => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('nF5KEEZ6F5suKmVJOmcn/210');
  const [info, setInfo] = useState('No info');
  

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
  }

    return (
      <SafeAreaView style={tw `items-center`}>
        <View style={tw `items-center`}>
            <View style={styles.barcodebox}>
              <BarCodeScanner onBarCodeScanned = {scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>Data completa: {text}</Text>
            <Text style={styles.maintext}>Id: {text.split('/')[0]}</Text>
            <Text style={styles.maintext}>Count: {text.split('/')[1]}</Text>
            <Text style={styles.maintext}>Entero: {parseInt(text.split('/')[1])}</Text>
            <Text style={styles.maintext}>Info: {info} </Text>            
        </View>
        {scanned && <UpdateStarsComponent id={text.split('/')[0]} quantityStars = {text.split('/')[1]}/>}
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