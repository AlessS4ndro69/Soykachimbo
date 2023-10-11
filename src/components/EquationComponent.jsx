import MathView, { MathText } from 'react-native-math-view';
import MathViewFallback from 'react-native-math-view/src/fallback';
import { View, Text } from 'react-native';

const Equation = (props) => {
    return (
        <View >
          
          <MathViewFallback
            //math={'\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}'}
            math = {props.equation}

          />
          
        </View>
      );
};
  
export default Equation;