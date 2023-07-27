import { 
    SafeAreaView, 
    Text,
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Image,
    TouchableHighlight,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ColorScheme from '../constants/ColorScheme';
import { useEffect, useState } from 'react';
import { useAuthAPI } from '../helper/useAuthAPI';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

const PatientList = ({ navigation }) => {
    const [ patients, setPatients ] = useState([]);
    const { callAPI, isLoading, error } = useAuthAPI();
    const [ search, setSearch ] = useState("");

    useEffect(()=>{
        const fetchPatientList = async () => {
            const response = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/mobile/patient/${search===""?"null":search}`,
                payload: ""
            });

            if (response){
                setPatients(response.patients);
            }
        }
        fetchPatientList();
    },[search,callAPI]);

    const handlePress = (id) => {
        navigation.navigate('Patient',{id});
    };

    const renderItem = (item) => (
        <TouchableHighlight activeOpacity={0.8} underlayColor={ColorScheme.grayInput} onPress={()=>handlePress(item._id)}>
            <View style={styles.patientContainer}>
                <Image source={{uri:'https://picsum.photos/200/300'}} style={styles.patientPicContainer}/>
                <View style={styles.patientInfoContainer}>
                    <Text style={styles.patientName}>{item.patientName?item.patientName:"???"}</Text>
                    <Text style={styles.patientPhone}>{item.patientEmail}</Text>
                    <Text style={styles.patientPhone}>{item.patientPhone?item.patientPhone:"[Phone not set]"}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    const handleRefresh = async () => {
        const response = await callAPI({
            method: "GET",
            apiRoute: `/api/admin/mobile/patient/${search===""?"null":search}`,
            payload: ""
        });

        if (response){
            setPatients(response.patients);
        }
    }

    return(
        <SafeAreaView style={styles.nativeBody}>
            <Text style={styles.titlePage}>Patients</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearch}
                    value={search}
                    placeholder="Search... (Name, Email, Phone Number)"
                    placeholderTextColor={ColorScheme.grayInputText}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.loginIcon} size={RFValue(20,680)}/>
            </View>
            <FlatList
                data={patients}
                renderItem={({item})=>renderItem(item)}
                keyExtractor={item => item._id}
                refreshing={isLoading}
                onRefresh={handleRefresh}
            />
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
    textInputContainer: {
        paddingHorizontal: RFValue(15,680),
    },
    input:{
        paddingLeft: RFValue(50,680),
        paddingRight: RFValue(15,680),
        paddingVertical: RFValue(7,680),
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        backgroundColor: ColorScheme.grayInput,
        borderRadius: RFValue(50,680),
        color: ColorScheme.blackish,
        fontFamily: 'Lato-Bold',
        marginVertical: RFValue(10,680),
        elevation: 3,
    },
    loginIcon:{
        color: ColorScheme.grayInputText,
        position:'absolute',
        marginTop: RFValue(20,680),
        marginLeft: RFValue(30,680),
    },
    patientContainer: {
        paddingHorizontal: RFValue(15,680),
        paddingVertical: RFValue(15,680),
        flexDirection: 'row',
    },
    patientPicContainer: {
        width: RFValue(55,680),
        height: RFValue(55,680),
        backgroundColor: ColorScheme.grayInput,
        borderRadius: RFValue(50,680),
    },
    patientInfoContainer: {
        justifyContent: 'center',
        marginLeft: RFValue(20,680),
    },
    patientName: {
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Black',
    },
    patientPhone: {
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Regular',
        marginTop:  RFValue(5,680),
    },

});
export default PatientList