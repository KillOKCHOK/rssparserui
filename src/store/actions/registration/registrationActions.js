
import axios from 'axios';
let sha256 = require('sha256');

let domain = "localhost:4000";
export const signUpAction=(param)=>{
    return async(dispatch, getState)=>{
        let pwd = await sha256(param.password);
        axios
        .post('http://'+domain+'/registration',{
            email:param.login,
	        password:pwd
          })//+param
        .then(async response => {
            await dispatch({type:"SignUpAction", message:"Registration successful, your id: "+response.data[0].id});
        })
        .catch(async err=>{
            await dispatch({type:"SignUpAction", message:err.response?err.response.data:"Something went wrong"});
        });
        
    }
}

export const setModalShow = (val) => {
    console.log("setmodalshow "+val)
    return {type:'setModalShow',
    modalShow:val}
}

export const cleanRegistrationMsg = () => {
    console.log("cleanRegistrationMsg")
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

