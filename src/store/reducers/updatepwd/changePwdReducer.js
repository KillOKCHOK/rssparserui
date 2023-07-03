
const initState = {
    registrationMessage:"My MSG",
    modalShow:false,
    validated: false,
    samePwd: true,
    fillForm:false
}


export const changePwdReducer = (state=initState,action) => {
    if(action.type==='PwdChangeLinkAction'){
        return{
            ...state,
            registrationMessage:action.message,
            modalShow:true
        }
    }
    else if(action.type==='cleanRegistrationMsg'){
        return{
            ...state,
            registrationMessage:""
        }
    }
    else if(action.type==='setModalShow'){
        return{
            ...state,
            modalShow:action.modalShow
        }
    }
    else if(action.type==='setModalShow'){
        return{
            ...state,
            modalShow:action.modalShow
        }
    }
    else if(action.type==='formValidation'){
        return{
            ...state,
            validated:action.validation,
            samePwd:action.samePwd,
            fillForm:action.fillForm
        }
    }
    else return {...state};
}

export default changePwdReducer;