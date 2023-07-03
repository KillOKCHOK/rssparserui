
import {setCookie, getCookie} from '../tools/cookieManagementTools';
import axios from 'axios';

export const authorizedAxiosTool = async() => {
    let sessionCookie = getCookie("sessionCookie");
    if(sessionCookie)axios.defaults.headers.common['Authorization'] = `Bearer_${sessionCookie}`;
    return axios;
}

// run after app start and after login
export const refreshAuthToken = (params) => {
        let domain = "localhost:4000";
        let sessionCookie = getCookie("sessionCookie");
        let expiresInSeconds = getCookie("expiresInSeconds");
        let userEmail = getCookie("user_email");
        let userId = getCookie("userId");
        let refreshLogic = async function () { 
            sessionCookie = getCookie("sessionCookie");
            expiresInSeconds = getCookie("expiresInSeconds");
            userEmail = getCookie("user_email");
            userId = getCookie("userId");
            if(sessionCookie){
                // else 
                if(expiresInSeconds>(new Date().getTime()/1000)){
                    let axios = await authorizedAxiosTool();
                    try {
                        let resp = await axios
                        .post('http://'+domain+'/refreshToken',{
                            email:userEmail,
                            userId:userId
                            ,
                            deviceType:sessionCookie.deviceType,
                            browserName:sessionCookie.browserName,
                            platformName:sessionCookie.platformName
                        });
                        if(resp.data.data.token){
                            setCookie("sessionCookie",resp.data.data.token,30);
                            axios.defaults.headers.common['Authorization'] = `Bearer_${resp.data.data.token}`;
                        }
                    } catch (error) {
                       console.log("Was not able to refresh session");
                       console.log(error);
                    }
                }
                else{
                    // delete sessionCookie
                   console.log(expiresInSeconds);
                   console.log(new Date().getTime()/1000);
                   console.log("Delete sessionCookie due to expiration date");
                    setCookie("sessionCookie","",NaN);
                }
            }
        };
        refreshLogic();
        setInterval(refreshLogic,
            // (30*1000));
        (12*60*60*1000));
}
