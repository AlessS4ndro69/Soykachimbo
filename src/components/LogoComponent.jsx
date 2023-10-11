import { useEffect } from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { Image } from "react-native";

import firebase from "../../database/firebase";
import { getFirestore, setDoc, collection, doc } from "firebase/firestore";




    const data_news = [
      {
        "name": "elemento1",
        "uri": "https://firebasestorage.googleapis.com/v0/b/repository-exercises.appspot.com/o/Diseño%20sin%20título%20(1).png?alt=media&token=3422a5c5-bae7-4ba1-be8c-2c2b3bffbf6f",
        "screen": ""
      },
      {
        "name": "elemento2",
        "uri": "https://firebasestorage.googleapis.com/v0/b/repository-exercises.appspot.com/o/Diseño%20sin%20título%20(1).png?alt=media&token=3422a5c5-bae7-4ba1-be8c-2c2b3bffbf6f",
        "screen": ""
      },
      {
        "name": "elemento3",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento4",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento5",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento6",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento7",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento5",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento6",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento7",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento2",
        "uri": "https://firebasestorage.googleapis.com/v0/b/repository-exercises.appspot.com/o/Diseño%20sin%20título%20(1).png?alt=media&token=3422a5c5-bae7-4ba1-be8c-2c2b3bffbf6f",
        "screen": ""
      },
      {
        "name": "elemento3",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento4",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento5",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento6",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento7",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento5",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento6",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      },
      {
        "name": "elemento7",
        "uri": "https://via.placeholder.com/300",
        "screen": ""
      }
    ];
  
    const db = getFirestore(firebase);
    const docRef = doc(db, "assets","assets_news");

const LogoComponent = () => {
    useEffect(()=>{
        const f = async() =>{
            const doc = await setDoc(docRef,{
                data_news
            });
            console.log("doc id: "); 
        };
        //f();           //eliminar toda esta función cuando se termine de preparar homescreen
    },[]);
    return (
        <Image 
                    style = {{
                        width: 115,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    source = {{
                        uri: "https://i.pinimg.com/originals/f8/37/13/f83713c369bd8e4422db28d802e5c4ff.png",
                    }}
        />
    );
}

export default LogoComponent;