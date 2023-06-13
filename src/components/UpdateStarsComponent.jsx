import { useEffect, useContext, useState} from "react";
import { Text, Alert, ActivityIndicator, View } from "react-native";
import firebase from "../../database/firebase";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";


const firestore = getFirestore(firebase);
const COLLECTION = 'tickets';


const UpdateStarsComponent = (props) => {
    const navigation = useNavigation();
    const {user, incrementStars} = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const updateTicket = async() => {
        const ref = doc(firestore, COLLECTION, props.id);
        await updateDoc(ref,{
            active: false
        });
        console.log(ref);
    };

    
    useEffect(() => {
        setLoading(true);
        const validationTicket = async() =>{
            const ref = doc(firestore, COLLECTION, props.id);
            const docSnap = await getDoc(ref);

            if(docSnap.exists()){
                if(docSnap.data().active){
                    updateTicket();
                    incrementStars(parseInt(props.quantityStars));
                    setLoading(false);
                }else{
                    Alert.alert('Ticket sin fondos :/');
                    navigation.goBack();
                }
            }else{
                Alert.alert('Ticket no reconocido por el sistema :/');
            }

        };
        validationTicket();

    },[])



    return (
        <View>
            {loading && <ActivityIndicator size={'large'}/>}
            <Text>Gracias por tu compra!</Text>
        </View>
        
    );
};



export default UpdateStarsComponent;