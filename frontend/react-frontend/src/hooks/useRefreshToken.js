import { axiosPublic } from '../api/config'
import useAuth from './useAuth'

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosPublic.get('/refresh', {
            withCredentials: false
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        })
    }
    
    return refresh;
}

export default useRefreshToken;