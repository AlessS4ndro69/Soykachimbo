import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import RepositoryList from "../components/RepositoryList";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import { SafeAreaView } from "react-native-safe-area-context";



const ExercisesScreen = () => {
    const route = useRoute();
    console.log(route.params.codeCourse);
    return (
        <SafeAreaView style = {tw`bg-white h-full `}>
            <HeaderComponent course ={route.params.course}/>
            <RepositoryList codeCourse = {route.params.codeCourse}/>
            <FooterComponent/>
        </SafeAreaView>
        
        
    );
}

export default ExercisesScreen;