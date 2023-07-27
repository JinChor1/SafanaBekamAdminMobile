import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { useLogOut } from './useLogOut';
import DomainAPI from '../constants/DomainAPI';

export const useAuthAPI = () => {
    const [error, setError] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.auth);
    const { logout } = useLogOut();

    const callAPI =  useCallback(async (req) => {
        if (user === null){
            Alert.alert('Authentication failed','Please log in and sign up first.',[
                {
                    text: 'OK',
                    onPress: ()=>(null),
                },
            ]);
            return null;
        }
        setIsLoading(true);
        setError(null);
        setErrorData(null);
        // req.method
        // req.apiRoute
        // req.payload
        if (user) {
            const response = await fetch(`${DomainAPI}${req.apiRoute}`, {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: req.method === 'GET' ? null : JSON.stringify(req.payload),
            });

            const json = await response.json();

            if (response.ok){
                setIsLoading(false);
                return json;
            } else {
                // unauthorized
                if (response.status === 401) {
                    Alert.alert('Authentication expired','Please log in again.',[
                        {
                            text: 'OK',
                            onPress: ()=>(null)
                        },
                    ]);
                    logout();
                    return null;
                }
                setIsLoading(false);
                setError(json.error);
                setErrorData(json.errorData);
                Alert.alert('Error!',json.error,[
                    {
                        text: 'OK',
                        onPress: ()=>(null),
                    },
                ]);
                return null;
            }
        }
    },[user])

    return { callAPI, isLoading, error, errorData, setErrorData };
}