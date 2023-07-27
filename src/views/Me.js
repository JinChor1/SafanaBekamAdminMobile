import { 
    SafeAreaView, 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    Alert,
} from 'react-native';
import { useLogOut } from '../helper/useLogOut';
import ColorScheme from '../constants/ColorScheme';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuthAPI } from '../helper/useAuthAPI';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

const Me = () => {
    const [ admin, setAdmin ] = useState(null);
    const { logout } = useLogOut();
    const { callAPI, isLoading, error } = useAuthAPI();

    useEffect(()=>{
        const fetchAdminData = async () => {
            const adminData = await callAPI({
                method: 'GET',
                apiRoute: '/api/admin/details',
                payload: ''
            });   
            
            if (adminData) {
                setAdmin(adminData);
            }
        };
        
        fetchAdminData();
    },[callAPI]);

    const handleLogout = () => {
        Alert.alert('Logging out','Are you sure ?',[
            {
                text: 'Ok',
                onPress: logout
            },
            {
                text: 'Cancel',
                onPress: ()=>(null)
            },
        ]);
    };

    return(
        <SafeAreaView style={styles.nativeBody}>
            <Text style={styles.titlePage}>Settings</Text>
            <View style={styles.containerRow}>
                <View>
                    <Text style={styles.adminUsername}>{admin?admin.adminUsername:" "}</Text>
                    <Text style={styles.adminEmail}>Email: {admin?admin.adminEmail:" "}</Text>
                    <Text style={styles.adminEmail}>Created at: {admin?new Date(admin.createdAt).toLocaleString():" "}</Text>
                </View>
                <Image source={{uri:'https://picsum.photos/200/300'}} style={styles.patientPicContainer}/>
            </View>
            <TouchableHighlight activeOpacity={0.5} underlayColor={ColorScheme.primary} onPress={handleLogout}>
                <View style={styles.logoutContainer}>
                    <FontAwesomeIcon icon={faRightFromBracket} size={RFValue(20,680)} style={{color: ColorScheme.primary}}/>
                    <Text style={styles.logoutText}>Logout</Text>
                </View>
            </TouchableHighlight>

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
    containerRow: {
        backgroundColor: ColorScheme.white,
        paddingHorizontal: RFValue(15,680),
        paddingVertical: RFValue(25,680),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: RFValue(25,680),
    },
    adminUsername: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Bold',
        marginBottom: RFValue(10,680),
    },
    adminEmail: {
        fontSize: RFValue(13,680),
        lineHeight: RFValue(13,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Regular',
        marginBottom: RFValue(5,680),
    },
    patientPicContainer: {
        width: RFValue(55,680),
        height: RFValue(55,680),
        backgroundColor: ColorScheme.grayInput,
        borderRadius: RFValue(50,680),
    },
    logoutContainer: {
        backgroundColor: ColorScheme.white,
        paddingHorizontal: RFValue(15,680),
        paddingVertical: RFValue(25,680),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Black',
        marginLeft: RFValue(10,680),
    }
})

export default Me