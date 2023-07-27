import { 
    SafeAreaView, 
    Text,
    StyleSheet,
    View,
    RefreshControl,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ColorScheme from '../constants/ColorScheme';
import { CalendarProvider, ExpandableCalendar, AgendaList } from 'react-native-calendars';
import { useEffect, useState } from 'react';
import { useAuthAPI } from '../helper/useAuthAPI';

const Calendar = () => {
    const [items, setItems] = useState([]);
    const { callAPI, isLoading, error } = useAuthAPI();

    useEffect(()=>{
        const fetchBookingMonth = async () => {
            const response = await callAPI({
                method: "POST",
                apiRoute: "/api/admin/mobile/calendar",
            });
            
            if (response) {
                setItems(response);
            }
        }
        
        fetchBookingMonth();
    },[]);

    const handleRefresh = async () => {
        const response = await callAPI({
            method: "POST",
            apiRoute: "/api/admin/mobile/calendar",
        });
        
        if (response) {
            setItems(response);
        }
    };

    const renderItem = ({item}) => (
        <View style={styles.agendaItems}>
            <Text style={styles.agendaItemsTitle}>{item.title}</Text>
            <Text style={styles.agendaItemsHour}>{item.hour}</Text>
            <Text style={styles.agendaItemsDuration}>{item.duration} hour/s</Text>
        </View>
    )

    return(
        <SafeAreaView style={styles.nativeBody}>
            <Text style={styles.titlePage}>Calendar</Text>
            {/* Calendar */}
            <View style={styles.calendarContainer}>
                <CalendarProvider
                    theme={{todayButtonTextColor: ColorScheme.secondary}}
                    style={styles.calendarProvider}
                    date={new Date()}
                    showTodayButton
                >
                    <ExpandableCalendar 
                        theme={{
                            arrowColor: ColorScheme.primary,
                            textMonthFontFamily: 'Lato-Bold',
                            monthTextColor: ColorScheme.primary,
                            todayTextColor: ColorScheme.secondary,
                            selectedDayBackgroundColor: ColorScheme.primary,
                            dayTextColor: ColorScheme.primary,
                            dotColor: ColorScheme.primary,
                        }}
                        style={styles.expandableCalander}
                        firstDay={1} 
                    />
                    <AgendaList 
                        style={styles.agendaList}
                        sections={items}
                        renderItem={renderItem}
                        sectionStyle={styles.section}
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh}/>}
                    />
                </CalendarProvider>
            </View>
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
    calendarContainer:{
        flex: 1,
    },
    calendarProvider:{
        borderTopLeftRadius: RFValue(20,680),
        borderTopRightRadius: RFValue(20,680),
        overflow: 'hidden',
        elevation: 10,
        borderWidth: 0,
    },
    agendaList: {
        backgroundColor: ColorScheme.white,
        borderColor: ColorScheme.grayInputText,
    },
    agendaItems:{
        borderBottomWidth: 0,
        borderColor: ColorScheme.grayInputText,
        paddingHorizontal: RFValue(20,680),
        paddingVertical: RFValue(20,680),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        backgroundColor: ColorScheme.grayBackground,
        textTransform: 'capitalize',
        color: ColorScheme.grayInputText,
        fontFamily: 'Lato-Black',
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
    },
    agendaItemsTitle: {
        fontFamily: 'Lato-Black',
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.primary,
    },
    agendaItemsHour: {
        fontFamily: 'Lato-Bold',
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.grayInputText,
    },
    agendaItemsDuration: {
        fontFamily: 'Lato-Regular',
        fontSize: RFValue(12,680),
        lineHeight: RFValue(12,680),
        color: ColorScheme.grayInputText,
    },
});
export default Calendar