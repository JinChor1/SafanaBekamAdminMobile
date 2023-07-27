import { 
    SafeAreaView, 
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    ScrollView,
    RefreshControl,
} from 'react-native';
import ColorScheme from '../constants/ColorScheme';
import { RFValue } from 'react-native-responsive-fontsize';
import Carousel from 'react-native-reanimated-carousel';
import { useEffect, useState } from 'react';
import { useAuthAPI } from '../helper/useAuthAPI';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faClock,
    faCheck,
    faDollar,
    faUserPlus,
    faBan,
} from '@fortawesome/free-solid-svg-icons';
import ProgressBar from 'react-native-progress/Bar';

const Home = () => {
    const width = Dimensions.get('window').width; // carousel
    const [dashboard, setDashboard] = useState(null)
    const { callAPI, isLoading, error } = useAuthAPI();

    useEffect(()=>{
        const fetchDashboardData = async () => {
            const dashboardData = await callAPI({
                method: 'GET',
                apiRoute: '/api/admin/dashboard',
                payload: ''
            })        
            
            if (dashboardData) {
                setDashboard(dashboardData)
            }
        };
        
        fetchDashboardData();
    },[callAPI]);

    const handleRefresh = async () => {
        const dashboardData = await callAPI({
            method: 'GET',
            apiRoute: '/api/admin/dashboard',
            payload: ''
        })        
        
        if (dashboardData) {
            setDashboard(dashboardData)
        }
    };

    return(
        <SafeAreaView style={styles.nativeBody}>
            <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh}/>}>
                <Text style={styles.titlePage}>Dashboard</Text>
                {/* Carousel Widget */}
                <Carousel
                    loop
                    mode={'parallax'}
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    data={dashboard?Object.entries(dashboard.widgetData):[...new Array(4).keys()]}
                    scrollAnimationDuration={1500}
                    renderItem={({ item, index }) => (
                        <View style={styles.carouselCard}>
                            <View style={[styles.cardWidget,styles[`cardWidget${index}`]]}>
                                <View>
                                    {item[0]==="revenue" && <View style={styles[`widgetIcon${index}`]}><FontAwesomeIcon icon={faDollar} style={styles.widgetIcon} size={RFValue(30,680)}/></View>}
                                    {item[0]==="newPatient" && <View style={styles[`widgetIcon${index}`]}><FontAwesomeIcon icon={faUserPlus} style={styles.widgetIcon} size={RFValue(30,680)}/></View>}
                                    {item[0]==="upcomingBooking" && <View style={styles[`widgetIcon${index}`]}><FontAwesomeIcon icon={faClock} style={styles.widgetIcon} size={RFValue(30,680)}/></View>}
                                    {item[0]==="completedBooking" && <View style={styles[`widgetIcon${index}`]}><FontAwesomeIcon icon={faCheck} style={styles.widgetIcon} size={RFValue(30,680)}/></View>}
                                </View>
                                <View style={styles.cardWidgetInfo}>
                                    {item[1] && <Text style={styles.countText}>{item[1].count}</Text>}
                                    {item[1] && 
                                        <Text style={styles.displayText}>
                                            {item[0]==="revenue" && "Revenue this week"}
                                            {item[0]==="newPatient" && "New patient this week"}
                                            {item[0]==="upcomingBooking" && "Upcoming bookings this week"}
                                            {item[0]==="completedBooking" && "Completed bookings this week"}
                                        </Text>
                                    }
                                    {item[1] && <Text style={styles.percentageText}>{item[1].percentage} from last week</Text>}
                                </View>
                            </View>
                        </View>
                    )}
                />
                {/* Insight */}
                <View style={styles.container}>
                    <Text style={styles.containerTitle}>Insight</Text>    
                    <View style={styles.containerCard}>
                        <View style={styles.insightItems}>
                            <View style={styles.insightUpcomingBooking}>
                                <FontAwesomeIcon icon={faClock} style={styles.widgetIcon} size={RFValue(20,680)}/>
                            </View>   
                            <View style={styles.insightInfo}>
                                <Text style={styles.insightPercText}>{dashboard?dashboard.bookingInsightData.percentageData.upcomingBooking.upcomingBookingPercentage:''}</Text>
                                <Text style={styles.insightDispText}>{dashboard?dashboard.bookingInsightData.percentageData.upcomingBooking.display:''}</Text>
                            </View>
                        </View>
                        <View style={styles.insightItems}>
                            <View style={styles.insightCompletedBooking}>
                                <FontAwesomeIcon icon={faCheck} style={styles.widgetIcon} size={RFValue(20,680)}/>
                            </View> 
                            <View style={styles.insightInfo}>
                                <Text style={styles.insightPercText}>{dashboard?dashboard.bookingInsightData.percentageData.completedBooking.completedBookingPercentage:''}</Text>
                                <Text style={styles.insightDispText}>{dashboard?dashboard.bookingInsightData.percentageData.completedBooking.display:''}</Text>
                            </View>
                        </View>
                        <View style={styles.insightItems}>
                            <View style={styles.insightCancelledBooking}>
                                <FontAwesomeIcon icon={faBan} style={styles.widgetIcon} size={RFValue(20,680)}/>
                            </View>   
                            <View style={styles.insightInfo}>
                                <Text style={styles.insightPercText}>{dashboard?dashboard.bookingInsightData.percentageData.cancelledBooking.cancelledBookingPercentage:''}</Text>
                                <Text style={styles.insightDispText}>{dashboard?dashboard.bookingInsightData.percentageData.cancelledBooking.display:''}</Text>
                            </View>
                        </View>
                    </View>      
                </View>
                {/* Top Service */}
                <View style={styles.container}>
                    <Text style={styles.containerTitle}>Top Booked Service</Text>    
                    <View style={styles.containerCard}>
                        <View>
                            {dashboard &&
                                dashboard.topServiceData.map((item)=>(
                                    <View key={item.serviceDetails._id} style={styles.topServiceContainer}>
                                        <Text style={styles.insightPercText}>{item.serviceDetails.serviceName}</Text>
                                        <ProgressBar 
                                            style={styles.progressbar} 
                                            width={RFValue(260,680)} 
                                            height={RFValue(6,680)} 
                                            progress={item.percentage/100}
                                            unfilledColor={ColorScheme.secondaryHover}
                                            color={ColorScheme.secondary}
                                            borderWidth={0}
                                        />
                                        <Text style={styles.insightDispText}>{item.count} booked</Text>
                                    </View>
                                ))
                            }
                            
                        </View>
                    </View>      
                </View>
            </ScrollView>
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
    carouselCard: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: RFValue(10,680),
    },
    cardWidget: {
        borderRadius: RFValue(20,680),
        overflow: 'hidden',
        paddingHorizontal: RFValue(20,680),
        paddingVertical: RFValue(30,680),
        flexDirection: 'row',
        elevation: 3,
    },
    cardWidget0 : {
        backgroundColor: '#FECED5',
    },
    cardWidget1 : {
        backgroundColor: '#FEE7CE',
    },
    cardWidget2 : {
        backgroundColor: '#CEFECF',
    },
    cardWidget3 : {
        backgroundColor: '#EECEFE',
    },
    widgetIcon: {
        color: ColorScheme.white,
    },
    widgetIcon0: {
        backgroundColor: '#FA5C76',
        borderRadius: RFValue(50,680),
        justifyContent: 'center',
        alignItems: 'center',
        width: RFValue(50,680),
        height: RFValue(50,680),
    },
    widgetIcon1: {
        backgroundColor: '#FAB05C',
        borderRadius: RFValue(50,680),
        justifyContent: 'center',
        alignItems: 'center',
        width: RFValue(50,680),
        height: RFValue(50,680),
    },
    widgetIcon2: {
        backgroundColor: '#5CFA61',
        borderRadius: RFValue(50,680),
        justifyContent: 'center',
        alignItems: 'center',
        width: RFValue(50,680),
        height: RFValue(50,680),
    },
    widgetIcon3: {
        backgroundColor: '#C55CFA',
        borderRadius: RFValue(50,680),
        justifyContent: 'center',
        alignItems: 'center',
        width: RFValue(50,680),
        height: RFValue(50,680),
    },
    cardWidgetInfo: {
        marginLeft: 'auto',
    },
    countText: {
        fontSize: RFValue(30,680),
        lineHeight: RFValue(30,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Black',
        textAlign: 'right',
    },
    displayText: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.grayInputText,
        fontFamily: 'Lato-Bold',
        textAlign: 'right',
        marginVertical: RFValue(15,680),
    },
    percentageText: {
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.secondary,
        fontFamily: 'Lato-Black',
        textAlign: 'right',
    },
    container: {
        marginHorizontal: RFValue(15,680),
        marginVertical: RFValue(10,680),
    },
    containerTitle:{
        color: ColorScheme.primary,
        fontFamily: 'Lato-Bold',
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        marginBottom: RFValue(15,680),
    },
    containerCard: {
        borderRadius: RFValue(20,680),
        backgroundColor: ColorScheme.white,
        elevation: 3,
        overflow: 'hidden',
        paddingHorizontal: RFValue(20,680),
        paddingVertical: RFValue(15,680),
    },
    insightItems: {
        flexDirection: 'row',
        marginVertical: RFValue(5,680),
    },
    insightUpcomingBooking: {
        width: RFValue(40,680),
        height: RFValue(40,680),
        borderRadius: RFValue(10,680),
        backgroundColor: '#FAB05C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insightCompletedBooking: {
        width: RFValue(40,680),
        height: RFValue(40,680),
        borderRadius: RFValue(10,680),
        backgroundColor: '#5CFA61',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insightCancelledBooking: {
        width: RFValue(40,680),
        height: RFValue(40,680),
        borderRadius: RFValue(10,680),
        backgroundColor: '#FA5C76',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insightInfo: {
        marginLeft: RFValue(15,680),
        justifyContent: 'center',
    },
    insightPercText: {
        fontSize: RFValue(13,680),
        lineHeight: RFValue(13,680),
        color: ColorScheme.primary,
        fontFamily: 'Lato-Black',
    },
    insightDispText: {
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.grayInputText,
        fontFamily: 'Lato-Bold',
    },
    topServiceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: RFValue(10,680),
    },
    progressbar: {
        marginTop: RFValue(5,680),
        marginBottom: RFValue(5,680),
        borderRadius: RFValue(20,680),
    },
});

export default Home