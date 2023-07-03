
import {getCookie} from '../../tools/cookieManagementTools';

let token = getCookie("sessionCookie");
let tokenExpTime = getCookie("expiresInSeconds");
let userEmail = getCookie("user_email");
let userId = getCookie("userId");


const initState = {
    user:token?{
        loggedIn:true,
        userId: userId?userId:"",
        email: userEmail,
        token:token
    }:{
        loggedIn:false,
    },
    loginerr:false,
    loginerrmsg:"",
    modalShow:false,
    registrationMessage:"",
    token:token,
    expiresInSeconds:tokenExpTime?tokenExpTime:((new Date().getTime() + 30 * 24 * 60 * 60 * 1000 )/1000), /// token exp time
}

const authReducer = (state=initState,action) => {
    if(action.type==='LOGIN')
    return{
        ...state,
        user:action.user,
        loginerr:false,
        loginerrmsg:"",
        token:action.token,
        expiresInSeconds:action.expiresInSeconds
    }
    
    else if(action.type==='INITAL_LOGIN')
    return{
        ...state,
        user:action.user,
        loginerr:false,
        loginerrmsg:"",
        token:action.token,
        expiresInSeconds:action.expiresInSeconds
    }

    else if(action.type==='LOGOUT')
    return{
        ...state,
        user:action.user,
        loginerr:false,
        loginerrmsg:"",
        token:"",
    }

    else if(action.type==='LOGIN_ERR')
    return{
        ...state,
        user:action.user,
        loginerr:action.loginerr,
        loginerrmsg:action.loginerrmsg,
    }

    else if(action.type==='setloginModalShow')
    return{
        ...state,
        modalShow:action.modalShow
    }

    else if(action.type==='cleanLoginMsg')
    return{
        ...state,
        loginerrmsg:"",
    }

    else return state;
}


export default authReducer;