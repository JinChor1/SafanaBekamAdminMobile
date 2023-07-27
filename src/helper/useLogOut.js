import { useDispatch } from 'react-redux';
import {LOGOUT} from '../redux/authSlice';
import Toast from 'react-native-toast-message';

export const useLogOut = () => {
    const dispatch = useDispatch();

    const logout =  async (req) => {
        // remove from redux
        dispatch(LOGOUT());

        Toast.show({
            type: 'info',
            text1: 'Logged out!',
        });
    };

    return { logout };
};
