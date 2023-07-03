const initState = {
    loginValidation: {validated:false,},
    samePwd:{ validated: false  },
    }
    
    const loginValidationReducer = (state=initState,action) => {
            if(action.type==='loginvalidation'){
                return{
                    ...state,
                    loginValidation:{ validated: action.loginValidation  },
                    samePwd:{ validated: action.samePwd  }
                }
            }
        else return {...state};
    }
    
    export default loginValidationReducer;