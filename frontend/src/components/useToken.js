import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useToken() {
    const getToken = () => {
        
        var accessTokenObj = JSON.parse(localStorage.getItem("token"));
        return accessTokenObj;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
        Cookies.set('token', userToken);
        console.log("useToken: ", token);
    };

    return [
      token, 
        saveToken
    ]
}