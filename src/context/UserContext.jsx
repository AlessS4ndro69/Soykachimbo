import { useState, createContext } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../database/firebase";
import { where, getDocs, getFirestore, collection, doc, getDoc, query, onSnapshot, updateDoc } from "firebase/firestore";

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
    const [_week, setWeek] = useState(3);
    const [catalogue, setCatalogue] = useState({});
    const [priceExercise, setPriceExercise] = useState(0);
    const [priceCourse, setPriceCourse] = useState(0);
    //// holding no se actualiza en los campos de user :(
    const [exercisesHolding, setExercisesHolding] = useState([]);
    const [coursesHolding, setCoursesHolding] = useState([]);

    const setAssets = (assets) => {
        console.log("obteniendo assets: ", assets);
        setPriceExercise(assets.price_exercise);
        setPriceCourse(assets.price_course);
        setCatalogue(assets.catalogue);
    };
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
        if(user.countStars >= quantity){
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

    const buyOcr = async(quantity) => {
        if(await decreaseStars(quantity)){
            Alert.alert('Se descontara 10 estrellas como donación');
        }else{
            Alert.alert('No cuenta con estrellas suficientes :(');
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
            ///// añadir a typesense
            


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

    const data = {user, login, setAssets, priceExercise, priceCourse, logout, incrementStars, decreaseStars, _week, _setWeek, buyOcr, buyExercise, buyCourse, exercisesHolding, coursesHolding, catalogue}; //// usuario y semana

    return (
        <UserContext.Provider value = {data}>
            {children}
        </UserContext.Provider>
    );




};











export {UserProvider}; 
export default UserContext;