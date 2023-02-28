import { useNavigate } from 'react-router-dom';
import { axiosPublic } from '../api/config';
import Cookies from 'js-cookie';

export default function Logout() {

    const navigate = useNavigate();


    const logoutuser = async () => {

        try {
            const response = await axiosPublic.get('/logout', {
                withCredentials: false
            });

            Cookies.remove('jwt');
            navigate("/login", { replace: true });
            
        }
        catch (Err) {
            console.log(Err);
        }
    }

    logoutuser();
    
}