const initState = {
testValidation: {validated:false,},
samePwd:{ validated: false  },
}

const testValidReducer = (state=initState,action) => {
        if(action.type==='testvalidation'){
            return{
                ...state,
                testValidation:{ validated: action.testValidation  },
                samePwd:{ validated: action.samePwd  }
            }
        }
    else return {...state};
}

export default testValidReducer;