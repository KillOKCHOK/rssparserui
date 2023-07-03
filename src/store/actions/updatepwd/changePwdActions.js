
import axios from 'axios';
import {getCookie} from '../../tools/cookieManagementTools';
let sha256 = require('sha256');
let sessionCookie = getCookie("sessionCookie");
if(sessionCookie) axios.defaults.headers.common['Authorization'] = `Bearer_${sessionCookie}`;

let domain = "localhost:4000";
export const PwdChangeLinkAction= (param)=>{
    return async(dispatch, getState)=>{
        let pwd = await sha256(param.password);
        axios
        .post('http://'+domain+'/updatepwd/',{
            login:param.login,
	        password:pwd
        })
        .then(async response => {
            await dispatch({type:"PwdChangeLinkAction", message:response.data.message?response.data.message:"Password updated"});
        })
        .catch(async err=>{
            await dispatch({type:"PwdChangeLinkAction", message:"Something went wrong"});
        });
        
    }
}

export const setModalShow = (val) => {
    return {type:'setModalShow',
    modalShow:val}
}

export const cleanRegistrationMsg = () => {
    return {type:'cleanRegistrationMsg',
    message:""}
}

export const formvalidation=(val)=>{
    return { 
        type:'formValidation',
        validation:val.validated ,
        samePwd:val.samePwd,
        fillForm:val.fillForm
    }
 }

