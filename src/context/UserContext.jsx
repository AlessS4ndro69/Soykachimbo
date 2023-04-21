import { useState, createContext } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../database/firebase";
import { where, getDocs, getFirestore, collection, doc, query, onSnapshot, updateDoc } from "firebase/firestore";

const firestore = getFirestore(firebase);

const UserContext = createContext();

const initialUser = {
    ///////// estado inicial
    countStars: 210, 
    coursesHolding: [],
    exercisesHolding: ['banana'],
    email: "ejemplo@gmail.com", 
    refStars: "clgsDAOSqQllObQJ8FKU", 
    uid: "scCMr3GKjnZk38Eb6Z4HDZ2LcLQ2",
    refHolding: "clgsDAOSqQllObQJ8FKU",

};

const UserProvider = ({children}) => {
    const navigation = useNavigation();
    const [user, setUser] = useState(initialUser);
    const [_week, setWeek] = useState(1);

    //// holding no se actualiza en los campos de user :(
    const [exercisesHolding, setExercisesHolding] = useState([]);
    const [coursesHolding, setCoursesHolding] = useState([]);
    
    const _setWeek = (val) => {
        setWeek(val);
    }
    const login = (user) => {
        console.log('logueados con el user: ',user);
        setUser(user);
        setExercisesHolding(user.exercisesHolding);
        setCoursesHolding(user.coursesHolding);
    };

    const logout = () => {
        setUser(null);
    };
    
    const incrementStars = async(quantity) => {
        ////////// codigo para agregar estrellas
        const ref = doc(firestore,'users_stars',user.refStars);
        await updateDoc(ref,{
            countStars: user.countStars + quantity
        });

        const countStars = user.countStars + quantity;
        setUser({...user, countStars})
        Alert.alert('Gracias por tu recarga');
        navigation.goBack();
        console.log("estamos agregando starts: ", quantity);
    }; 

    const decreaseStars = async(quantity) => {
        
        console.log("descontando estrellas: ", quantity);
        if(user.countStars > quantity){
            ///////// descontando estrellas
            console.log('estrellas de user: ', user.countStars);
            const ref = doc(firestore,'users_stars',user.refStars);
            await updateDoc(ref,{
                countStars: user.countStars - quantity
            });

            const countStars = user.countStars - quantity;
            setUser({...user, countStars});
            return true;

        }else{
            return false;
        }
        

    };

    const buyExercise = async(id, quantity) => {
        /// id exercise
        console.log("desde buy estrellas: ", quantity + "=>" + id);
        if(await decreaseStars(quantity)){
            //const exercisesHolding = [...user.exercisesHolding, id];
            
            //setUser({...user, exercisesHolding: ['banana']});

            
            ///// actualizando en firebase
            const ref = doc(firestore,'users_holding', user.refHolding);
            await updateDoc(ref,{
                exercisesHolding: [...exercisesHolding, id]
            });

            setExercisesHolding(exercisesHolding => [...exercisesHolding, id]);
            Alert.alert('Gracias por tu compra');
            console.log(user);
            console.log(exercisesHolding);
        }else{
            Alert.alert('No cuenta con estrellas suficientes :(');
        }
    };

    const buyCourse = async (id, quantity, week) => {
        console.log("desde buycourse estrellas: ", quantity + "=>" + id);
        if(await decreaseStars(quantity)){
            
            const ref = doc(firestore, 'users_holding', user.refHolding);
            await updateDoc(ref, {
                coursesHolding: [...coursesHolding,{codeCourse: id, week: week}]
            });

            setCoursesHolding(coursesHolding => [...coursesHolding,{codeCourse: id, week: week}])
            Alert.alert('Gracias por tu compra');
            console.log(user);
            console.log(coursesHolding);

        }else{
            Alert.alert('no cuenta con estrellas suficientes');
        }
    };

    const data = {user, login, logout, incrementStars, decreaseStars, _week, _setWeek, buyExercise, buyCourse, exercisesHolding, coursesHolding}; //// usuario y semana

    return (
        <UserContext.Provider value = {data}>
            {children}
        </UserContext.Provider>
    );




};











export {UserProvider}; 
export default UserContext;