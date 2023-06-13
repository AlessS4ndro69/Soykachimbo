import { useContext } from "react";

import { View, Text, Button } from "react-native";
import UserContext from "../context/UserContext";
import HeaderComponent from "../components/HeaderComponent";
import RepositoryList from "../components/RepositoryList";
import { useNavigation } from "@react-navigation/native";


const FileQrScreen = (props) => {
    const  {_setWeek} = useContext(UserContext);
    const navigation = useNavigation();

    _setWeek(parseInt(props.week));

    return (
        <View>
            <Text>Code course: {props.codeCourse}</Text>
            <Text>Week: {props.week}</Text>
            {/*<HeaderComponent course ={"Práctica"}/>*/}
            {/*<RepositoryList codeCourse = {parseInt(props.codeCourse)}/>*/}
            {<Button 
                
                onPress={() => navigation.navigate('ExercisesScreen',{
                    codeCourse: parseInt(props.codeCourse),
                    course: "Práctica",
                })}
                title = "Ir a la practica"
            />}
            
        </View> 
    );
};

export default FileQrScreen;