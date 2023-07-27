import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {LOGIN} from '../redux/authSlice';
import Toast from 'react-native-toast-message';
import DomainAPI from '../constants/DomainAPI';

export const useLogIn = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const login =  async (req) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${DomainAPI}/api/admin/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req),
        });
        const json = await response.json();

        if (!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok){
            dispatch(LOGIN(json));
            setIsLoading(false);
            Toast.show({
                type: 'success',
                text1: 'Login successful!',
            });
        }
    };

    return { login, isLoading, error };
};
