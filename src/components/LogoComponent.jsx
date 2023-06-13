import { Icon } from "react-native-elements";
import tw from "twrnc";
import { Image } from "react-native";

const LogoComponent = () => {
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