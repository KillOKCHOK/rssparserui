
import axios from 'axios';
import {setCookie, getCookie} from '../../tools/cookieManagementTools';

let sha256 = require('sha256');

export const initalLogin=()=>{
  let usr = getCookie("user_email");
  let userId = getCookie("userId");
  return { 
    type:'INITAL_LOGIN',
    user:usr?{
      loggedIn:true,
      userId: userId?userId:"",
      email: usr
    }:{ loggedIn:false},
    token:getCookie("sessionCookie"),
    expiresInSeconds:getCookie("expiresInSeconds")?getCookie("expiresInSeconds"):((new Date().getTime() + 29 * 24 * 60 * 60 * 1000 )/1000)
  }
}

export const logout=()=>{
  setCookie("user_email", "", 30);
  setCookie("userId", "", 30);
  setCookie("sessionCookie", "", 30);
  return { 
      type:'LOGOUT',
      user:{ loggedIn:false},
      token:"",
    }
  }
  
  let domain = "localhost:4000";
  
  export const login = (loginData, myFunc)=>{
    let user = loginData.user;
    return async(dispatch)=>{
      let pwd = await sha256(user.password);
        axios
        .post('http://'+domain+'/login',{
          login:user.email,
	        password:pwd
        })
        .then(async response => {
          await dispatch(
                {
                    type:"LOGIN", 
                    user:{ 
                        loggedIn:true,
                        userId: response.data?response.data.data.userId:"No Data",
                        email: response.data?response.data.data.email:"No Data"
                    },
                    token:response.data.data.token,
                    expiresInSeconds:response.data?response.data.data.expiresInSeconds:2000
                }
            );
            // store session cookie
            return {
              expiresInSeconds:response.data?response.data.data.expiresInSeconds:2000,
              user:{ 
                loggedIn:true,
                userId: response.data?response.data.data.userId:"No Data",
                email: response.data?response.data.data.email:"No Data",
                token:response.data.data.token?response.data.data.token:"No Data",
              }
            }
        })
        .then(cookies=>{
            setCookie("user_email", cookies.user.email, 1);
            setCookie("userId", cookies.user.userId, 1);
            setCookie("sessionCookie", cookies.user.token, 1);
            setCookie("expiresInSeconds", cookies.expiresInSeconds, 1);
          })
          .then(()=>{
            loginData.props.history.push('/');
        })
        .catch(async err=>{
            await dispatch(
                {
                    type:"LOGIN_ERR", 
                    user:{ 
                        loggedIn:false
                    },
                    loginerr:true,
                    loginerrmsg:err.response?err.response.data.message:"Please enter correct data"
                },
                    
            );
            loginData.props.setLoginModalShow(true);
            
        }); 
          
    }
    
}

export const setModalShow = (val) => {
    return {
        type:'setloginModalShow',
        modalShow:val
    }
}

export const cleanLoginMsg = () => {
    return {
        type:'cleanLoginMsg',
        message:""
    }
}

