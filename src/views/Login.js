import { useState } from "react";
import { 
    Image, 
    SafeAreaView, 
    StyleSheet,
    View, 
    Text, 
    TextInput,
    Button,
    Pressable,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ColorScheme from "../constants/ColorScheme";
import { useLogIn } from '../helper/useLogIn'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
    const { login, isLoading, error } = useLogIn() 
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleLogin = async() => {
        await login({
            companyId: '642eba43b8443b189beec436',
            adminUsername: username,
            adminPassword: password,
        });
    };

    return(
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#5CE5FA', '#212161']} style={styles.loginContainer}>
                <Image 
                    style={styles.loginLogo}
                    source={{uri: 'https://69364-fyp-system.s3.ap-southeast-1.amazonaws.com/whiteLogo.png'}}
                />
                <Text style={styles.logoText}>Administrator Management</Text>
                <Text style={styles.loginText}>Login</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                        placeholderTextColor={ColorScheme.grayInputText}
                        textContentType="username"
                    />
                    <FontAwesomeIcon icon={faUser} style={styles.loginIcon} size={RFValue(20,680)}/>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor={ColorScheme.grayInputText}
                        textContentType="password"
                        secureTextEntry={true}
                    />
                    <FontAwesomeIcon icon={faLock} style={styles.loginIcon} size={RFValue(20,680)}/>
                </View>
                <Text style={styles.errorText}>{error?error:'  '}</Text>
                <Pressable 
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            </LinearGradient>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorScheme.white,
    },
    loginLogo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',
    },
    loginIcon:{
        color: ColorScheme.grayInputText,
        position:'absolute',
        marginTop: RFValue(21,680),
        marginLeft: RFValue(15,680),
    },
    logoText:{
        fontSize: RFValue(13,680),
        lineHeight: RFValue(13,680),
        color: ColorScheme.white,
        fontFamily: 'Lato-Bold',
    },
    loginText:{
        fontSize: RFValue(22,680),
        lineHeight: RFValue(22,680),
        color: ColorScheme.white,
        fontFamily: 'Lato-Black',
        marginTop: RFValue(100,680),
        marginBottom: RFValue(25,680),
    },
    input:{
        width: RFValue(250,680),
        paddingLeft: RFValue(50,680),
        paddingRight: RFValue(15,680),
        paddingVertical: RFValue(10,680),
        fontSize: RFValue(13,680),
        lineHeight: RFValue(13,680),
        backgroundColor: ColorScheme.grayInput,
        borderRadius: RFValue(50,680),
        color: ColorScheme.blackish,
        fontFamily: 'Lato-Bold',
        marginVertical: RFValue(10,680),
        elevation: 3,
    },
    errorText:{
        fontSize: RFValue(15,680),
        lineHeight: RFValue(15,680),
        color: ColorScheme.error,
        fontFamily: 'Lato-Bold',
        marginVertical: RFValue(20,680),
    },
    loginButton:{
        width: RFValue(250,680),
        borderRadius: RFValue(50,680),
        backgroundColor: ColorScheme.secondary,
        paddingVertical: RFValue(13,680),
        elevation: 3,
    },
    loginButtonText:{
        width: '100%',
        textAlign: 'center',
        lineHeight: RFValue(15,680),
        fontSize: RFValue(15,680),
        color: ColorScheme.white,
        fontFamily: 'Lato-Regular',
    }
});

export default Login