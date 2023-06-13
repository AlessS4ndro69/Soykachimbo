import { where, getDoc, getFirestore, collection, doc, query, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import {ScrollView, Text, Button, View, Alert, ActivityIndicator, StyleSheet,TouchableOpacity, Image, Modal, Pressable} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, Avatar, Icon} from "react-native-elements";
import { FlatList, TextInput } from "react-native-gesture-handler";
import tw from "twrnc";
import UserContext from "../context/UserContext";

import firebase from "../../database/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const firestore = getFirestore(firebase);
//const q = query(usersRef, where("name" ,"==" ,true));

const solutionRef = collection(firestore,"images");
//const weekNumber = 2;


const ProposalListScreen = (props) => {
    const initialState = {
        id: "",
        uri: "",
        accept: null,
        reason: ""
    };
    let condicion = "ga";

    const [proposals, setProposals] = useState(initialState);
    const [isEmpty, setEmpty] = useState(false);
    const [isFinalize, setFinalize] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [uriPath, setUriPath] = useState("");
    const [uid, setUid] = useState("");
    const [docid,setDocId] = useState("");
    const [statementId, setStatementId] = useState("");
    const [uriStatement, setUriStatement] = useState("");

    const {user} = useContext(UserContext);
    console.log("user id: ",user.uid);

    const getProposalByUid = (uid) => {
        const q = query(solutionRef, where("author", "==", uid));
    
        onSnapshot(q, (querySnapshot) => {  
            setLoading(true);
            const proposals = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                const { uri, accept, reason, statement} = doc.data();
    
                proposals.push({
                    id: doc.id,
                    uri,
                    reason,
                    accept,
                    statement
                });
                
            });
            setEmpty(querySnapshot.empty);
            setProposals(proposals);
            setFinalize(true);
            
            console.log("Current proposals: ", proposals);
    
        });

        setLoading(false);
    };



    useEffect(() => {
        console.log("Obteniendo propuestas de user: ",user.uid);
        getProposalByUid(user.uid);
    },[]);  

    console.log("al propuestas son: ",proposals);

    

    return (
        <View style = {tw`p-4 pb-6 w-full`}>
            <View style = {tw`justify-center items-center` }>
            {isEmpty  && <Text style = {tw`text-base font-black`}>No tienes propuestas</Text>}
            </View>
        {isFinalize && <FlatList 
            
            data={proposals}
            renderItem={({item}) => (
                <ListItem
                key={item.id}
                bottomDivider
                onPress={async() => { 
                    console.log("presionando propuesta");
                    setModalVisible(true);
                    setUriPath(item.uri);
                    setUid(item.author);
                    setDocId(item.id);
                    setStatementId(item.statement);
                    //setUriStatement(proposal.captureStatement);
                    console.log("id de statement: ",item.statement)

                    const docSnap = await getDoc(doc(firestore, "statements", item.statement))
                        if(docSnap.exists()){
                            setUriStatement(docSnap.data().captureStatement);    
                        }
                    
                }}
                
                >
                    
                <ListItem.Chevron />
                <Image
                                style = {{width: 50, height: 50, resizeMode: "contain"}}
                                source = {{uri : item.uri}}
                            />
                <ListItem.Content >
                <ListItem.Title>Condicion: {item.accept == 0? "En espera": item.accept == 1? "Aceptado" : "Rechazado"}</ListItem.Title>
                <ListItem.Subtitle>{item.reason}</ListItem.Subtitle>
                </ListItem.Content>
                        
            </ListItem>
            )}
        />}
        {!isFinalize && <View >
                        <ActivityIndicator size="large" color="#9E9E9E" />
                    </View>}
    
        {/* isFinalize && proposals.map((proposal) => {
            return (
            <ListItem 
                key={proposal.id}
                bottomDivider
                
                onPress={async() => { 
                console.log("presionando propuesta");
                setModalVisible(true);
                setUriPath(proposal.uri);
                setUid(proposal.author);
                setDocId(proposal.id);
                setStatementId(proposal.statement);
                //setUriStatement(proposal.captureStatement);
                console.log("id de statement: ",proposal.statement)

                const docSnap = await getDoc(doc(firestore, "statements", proposal.statement))
                    if(docSnap.exists()){
                        setUriStatement(docSnap.data().captureStatement);    
                    }
                    
                }}
                
            >
                <ListItem.Chevron />
                <Image
                                style = {{width: 50, height: 50, resizeMode: "contain"}}
                                source = {{uri : proposal.uri}}
                            />
                <ListItem.Content >
                <ListItem.Title>Condicion: {proposal.accept == 0? "En espera": proposal.accept == 1? "Aceptado" : "Rechazado"}</ListItem.Title>
                <ListItem.Subtitle>{proposal.reason}</ListItem.Subtitle>
                </ListItem.Content>
                        
            </ListItem>
            );
        })*/}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {uriStatement && <Image
                        style={{alignItems:'center', width: 300, height: 100, marginBottom:3}}
                        source={{uri: uriStatement}}
                        />}
                    <Image
                    style={{alignItems:'center', width: 300, height: 420, marginBottom:3}}
                    source={{uri: uriPath}}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                        
                    >
                        <Text style={styles.textStyle}>Bien!</Text>
                    </Pressable>
                    
                </View>
                </View>
        </Modal>
        
        
        </View>
    
    );
    
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });



export default ProposalListScreen;