import { useState, useEffect } from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import tw from "twrnc";



const ScanQrComponent = (props) =>{


    
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const [text, setText] = useState('nF5KEEZ6F5suKmVJOmcn/210');
  //const [text, setText] = useState('');
  const [info, setInfo] = useState('No info');
  
  
  //props.setText("11/12");

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
    //console.log(text.split(' '));
    setScanned(true);
    //setText(data);
    props.setText(data);     
    
    setInfo('Type: ' + type + '\nData: ' + data);
    
    console.log('Type: ' + type + '\nData: ' + data);
    //console.log(text.split('/'));
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
        <View style = {tw`items-center`}>
            <View style={styles.barcodebox}>
              <BarCodeScanner onBarCodeScanned = {scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }} />
            </View>
            
            {/*<Text>Data: {text}</Text>*/}
        </View>
        
    );  
};

export default ScanQrComponent;


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