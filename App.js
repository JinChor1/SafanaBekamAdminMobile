import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Login from './src/views/Login';
import Home from './src/views/Home';
import Calendar from './src/views/Calendar';
import PatientList from './src/views/PatientList';
import Patient from './src/views/Patient';
import Me from './src/views/Me';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faDashboard,
    faCalendar,
    faClipboard,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import ColorScheme from './src/constants/ColorScheme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DefaultContainer = () => (
  <Tab.Navigator 
    screenOptions={{
      tabBarStyle:{
        height: RFValue(60,680),
        backgroundColor: ColorScheme.white,
        borderWidth: 0,
        elevation: 10,
        overflow: 'hidden',
        borderTopWidth: 0,
      },
      tabBarLabelStyle:{
        paddingBottom: RFValue(7,680),
        fontSize: RFValue(0,680),
        fontFamily: 'Lato-Regular',
      },
      tabBarActiveTintColor: ColorScheme.primary,
      tabBarInactiveTintColor: ColorScheme.grayInputText,
    }}
  >
    <Tab.Screen 
      name="Dashboard"
      component={Home} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({focused,color,size})=>(
          <FontAwesomeIcon icon={faDashboard} size={RFValue(25,680)} style={{color}}/>
        ),
      }}
    />
    <Tab.Screen 
      name="Calendar" 
      component={Calendar} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({focused,color,size})=>(
          <FontAwesomeIcon icon={faCalendar} size={RFValue(25,680)} style={{color}}/>
        ),
      }}
    />
    <Tab.Screen 
      name="Patients" 
      component={PatientList} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({focused,color,size})=>(
          <FontAwesomeIcon icon={faClipboard} size={RFValue(25,680)} style={{color}}/>
        ),
      }}
    />
    <Tab.Screen 
      name="Me" 
      component={Me} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({focused,color,size})=>(
          <FontAwesomeIcon icon={faUser} size={RFValue(25,680)} style={{color}}/>
        ),
      }}
    />
  </Tab.Navigator>
)

const App = () => {
  const user = useSelector((state) => state.auth.userId);
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          { user!=='' ? 
            <>
              <Stack.Screen name="Default" component={DefaultContainer} options={{ headerShown: false }}/>
              <Stack.Screen name="Patient" component={Patient} options={{ headerShown: false }}/>
            </>
          :
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          }
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App