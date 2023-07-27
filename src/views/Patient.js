import { 
    SafeAreaView, 
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ColorScheme from '../constants/ColorScheme';
import { useEffect, useState } from 'react';
import { useAuthAPI } from '../helper/useAuthAPI';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Demography from './Demography';
import HealthBackground from './HealthBackground';

const Tab = createMaterialTopTabNavigator();

const Patient = ({ route, navigation }) => {
    const [ patient, setPatient ] = useState([]);
    const { callAPI, isLoading, error } = useAuthAPI();
    const { id } = route.params;

    useEffect(()=>{
        const fetchPatient = async () => {
            const response = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/patient/${id}`,
                payload: ""
            });

            if (response){
                setPatient(response);
            }
        }
        fetchPatient();
    },[id,callAPI]);

    const handleRefresh = async () => {
        const response = await callAPI({
            method: "GET",
            apiRoute: `/api/admin/patient/${id}`,
            payload: ""
        });

        if (response){
            setPatient(response);
        }
    }

    return(
        <SafeAreaView style={styles.nativeBody}>
            <LinearGradient colors={['#5CE5FA', '#212161']} style={styles.patientHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={styles.goBackContainer}>
                        <FontAwesomeIcon icon={faChevronLeft} size={RFValue(20,680)} style={{color: ColorScheme.white}}/>
                        <Text style={styles.goBackText}>Go Back</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.patientInfo}>
                    <Image source={{uri:'https://picsum.photos/200/300'}} style={styles.patientPicContainer}/>
                    <Text style={styles.patientName}>{patient.patientName?patient.patientName:"???"}</Text>
                    <Text style={styles.patientPhone}>{patient.patientEmail?patient.patientEmail:" "}</Text>
                    <Text style={styles.patientPhone}>{patient.patientPhone?patient.patientPhone:"[Phone not set]"}</Text>
                </View>
            </LinearGradient>
            <Tab.Navigator 
                style={styles.tabBar}
                screenOptions={{
                    tabBarStyle:{
                        backgroundColor: 'transparent',
                    },
                    tabBarLabelStyle:{
                        fontSize: RFValue(12,680),
                        fontFamily: 'Lato-Bold',
                        color: ColorScheme.white,
                    },
                    tabBarIndicatorStyle:{
                        height: RFValue(5,680),
                        backgroundColor: ColorScheme.white,
                        borderRadius: RFValue(20,680),
                    },
                }}
            >
                <Tab.Screen name="Demography">
                    {(props)=> <Demography {...props} patient={patient} isLoading={isLoading} handleRefresh={handleRefresh}/>}
                </Tab.Screen>
                <Tab.Screen name="Health">
                    {(props)=> <HealthBackground {...props} patient={patient} isLoading={isLoading} handleRefresh={handleRefresh}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    nativeBody: {
        backgroundColor: ColorScheme.grayBackground,
        flex: 1,
    },
    titlePage: {
        fontSize: RFValue(25,680),
        lineHeight: RFValue(25,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Black',
        marginHorizontal: RFValue(15,680),
        marginVertical: RFValue(25,680),
    },
    patientHeader: {
        paddingHorizontal: RFValue(15,680),
        paddingVertical: RFValue(25,680),
    },
    goBackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBackText: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.white,
        fontFamily: 'Lato-Regular',
    },
    patientInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFValue(50,680),
        marginBottom: RFValue(70,680),
    },
    patientPicContainer: {
        width: RFValue(100,680),
        height: RFValue(100,680),
        backgroundColor: ColorScheme.grayInput,
        borderRadius: RFValue(50,680),
        borderWidth: 3,
        borderColor: ColorScheme.white,
    },
    patientName: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.white,
        fontFamily: 'Lato-Black',
        marginTop:  RFValue(20,680),
    },
    patientPhone: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.white,
        fontFamily: 'Lato-Regular',
        marginTop:  RFValue(10,680),
    },
    tabBar: {
        marginTop:  RFValue(-50,680),
    }
});
export default Patient