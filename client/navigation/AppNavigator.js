
import React from 'react'; 
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 

//set up navigator 
const Stack = createStackNavigator(); 
//import screens 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';


function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false}}
                />
                <Stack.Screen 
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false}}
                />
                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
                    options={{headerLeft: null}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator 
