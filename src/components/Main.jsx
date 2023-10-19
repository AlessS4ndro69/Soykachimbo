
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from '../context/UserContext';

import ExercisesScreen from "../screens/ExercisesScreen";
import OCR from "./OCR";
import AuthSession from './AuthSession';
import SolutionScreen from '../screens/SolutionScreen';
import InfoUserScreen from '../screens/InfoUserScreen';
//import ScanQRScreen from '../screens/ScanQRScreen';
import SearchStatementScreen from '../screens/SearchStatementScreen';
import ProposalListScreen from './ProposalList';
import ProposalScreen from '../screens/ProposalScreen';
import ResultSearchScreen from '../screens/ResultSearchScreen';

import CheatSheetScreen from '../screens/CheatSheetScreen';
import GeneralScreen from '../screens/GeneralScreen';
import SolverScreen from '../screens/SolverScreen';
import PracticeTiktokScreen from '../screens/PracticeTiktokScreen';
import PaginationScreen from '../screens/PaginationScreen';
import EvaluationScreen from '../screens/EvaluationScreen';
import EvaluationResultScreen from '../screens/EvaluationResultScreen';
import QuestionScreen from '../screens/QuestionScreen';
import EvaluationSolutionScreen from '../screens/EvaluationSolutionScreen';


//import GoogleAuthSession from './GoogleAuthSession';

/*
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CoursesScreen from "../screens/CoursesScreen";
import AddUserScreen from '../screens/AddUserScreen';
*/

import HomeScreen from '../screens/HomeScreen';

function MyStack(){
  return (
      <Stack.Navigator initialRouteName="Home">
        {
          <Stack.Screen
          name = "AuthSession"
          component={AuthSession}
          options = {{
            headerShown: false
          }}
      />
        }
        
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options = {{
            headerShown: false
          }}
        />
        
        <Stack.Screen
            name = "OCR"
            component={OCR}
            options = {{
              headerShown: false
            }}
          />
        <Stack.Screen
          name = "ExercisesScreen"  
          component={ExercisesScreen}
          options = {{
            headerShown: false
          }}
        />
        
        <Stack.Screen
          name = "SolutionScreen"
          component={SolutionScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = "InfoUserScreen"
          component={InfoUserScreen}
          options={{
            headerShown: false
          }}
        />
        {/*<Stack.Screen
          name = 'ScanQRScreen'
          component={ScanQRScreen}
          options={{
            headerShown: false
          }}
        />*/}
        <Stack.Screen
          name = 'SearchStatementScreen'
          component={SearchStatementScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'ProposalScreen'
          component={ProposalScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'ResultSearchScreen'
          component={ResultSearchScreen}
          options={{
            headerShown: false
          }}
        />
        
        <Stack.Screen
          name = 'CheatSheetScreen'
          component={CheatSheetScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'GeneralScreen'
          component={GeneralScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='SolverScreen'
          component={SolverScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'PracticeTiktokScreen'
          component={PracticeTiktokScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = "PaginationScreen"
          component={PaginationScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name = "EvaluationScreen"
          component={EvaluationScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = "EvaluationResultScreen"
          component={EvaluationResultScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = "QuestionScreen"
          component={QuestionScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name= 'EvaluationSolutionScreen'
          component={EvaluationSolutionScreen}
          options={{
            headerShown: false
          }}
        />
        {
          /*<Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Courses" component={CoursesScreen} />
        <Stack.Screen name="Add User" component={AddUserScreen} />*/}
      </Stack.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const Main = () => {
    return (
    <NavigationContainer>
      <UserProvider>
        <MyStack /> 
      </UserProvider>
    </NavigationContainer>
  );
}

export default Main 

