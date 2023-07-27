import { 
    SafeAreaView, 
    Text,
    StyleSheet,
    ScrollView,
    View,
    RefreshControl,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ColorScheme from '../constants/ColorScheme';
import { useEffect, useState } from 'react';

const HealthBackground = (props) => {
    const { patient, isLoading, handleRefresh }  = props;
    const [ disease, setDisease] = useState([]);

    useEffect(()=>{
        setDisease([]);
        
        if (patient.healthBackground){
            Object.entries(patient.healthBackground).map((each)=>{
                if (each[1].hasDisease) {
                    setDisease(prevState=>[...prevState,each[1]])
                }
            });
        }
    },[patient])

    return(
        <SafeAreaView style={styles.nativeBody}>
            <ScrollView style={[styles.scrollView,styles.nativeBody]} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh}/>}>
                <Text style={styles.categoryText}>Heath Background</Text>
                <View style={styles.container}>
                    { disease.map((each)=>(
                        <View style={styles.textRow} key={each.displayName}>
                            <Text style={styles.infoText}>{each.displayName}: </Text>
                            <Text style={styles.infoDesc}>{each.medication?each.medication:'No medication specified'}</Text>
                        </View>
                    ))}
                    { disease.length === 0 && 
                        <Text style={styles.emptyText}>No health problem!</Text>
                    }
                </View>
                <Text>  </Text>
                <Text>  </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    nativeBody: {
        backgroundColor: ColorScheme.grayBackground,
        flex: 1,
    },
    scrollView: {
        paddingVertical: RFValue(25,680),
    },
    container: {
        borderRadius: RFValue(20,680),
        paddingHorizontal: RFValue(20,680),
        marginHorizontal: RFValue(20,680),
        paddingTop: RFValue(20,680),
        paddingBottom: RFValue(10,680),
        marginBottom: RFValue(20,680),
        elevation: 10,
        backgroundColor: ColorScheme.white,
    },
    infoText: {
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Bold',
    },
    infoDesc: {
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Regular',
    },
    categoryText: {
        fontSize: RFValue(14,680),
        lineHeight: RFValue(14,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Bold',
        marginLeft: RFValue(20,680),
        marginBottom: RFValue(10,680),
    },
    textRow: {
        flexDirection: 'row',
        marginBottom: RFValue(10,680),
    },
    emptyText: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.grayInputText,
        fontFamily: 'Lato-Black',
        textAlign: 'center',
        marginBottom: RFValue(10,680),
    }
})

export default HealthBackground