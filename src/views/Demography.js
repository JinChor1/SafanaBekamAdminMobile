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

const Demography = (props) => {
    const { patient, isLoading, handleRefresh }  = props;

    return(
        <SafeAreaView style={styles.nativeBody}>
            <ScrollView style={[styles.scrollView,styles.nativeBody]} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh}/>}>
                <Text style={styles.categoryText}>Contact</Text>
                <View style={styles.container}>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Phone: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientPhone:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Email: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientEmail:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Address: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientAddress:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Postcode: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientPostcode:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>State: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientState:" "}</Text>
                    </View>
                </View>
                <Text style={styles.categoryText}>Demographic</Text>
                <View style={styles.container}>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Name: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientName:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Sex: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientGender:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Race: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientRace:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>Occupation: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientOccupation:" "}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoText}>No MyKad: </Text>
                        <Text style={styles.infoDesc}>{patient?patient.patientNoMyKad:" "}</Text>
                    </View>
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

})

export default Demography