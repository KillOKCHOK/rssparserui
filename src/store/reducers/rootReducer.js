import authReducer from './auth/authReducer';
import loginValidationReducer from './auth/loginValidationReducer';
import registrationReducer from './registration/registrationReducer';
import changePwdReducer from './updatepwd/changePwdReducer';
import testFormValid from './updatepwd/formValidationReducers';
import postsReducer from './posts/listPostsReducer';
import singlePostReducer from './posts/singlePostReducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth:authReducer,
    loginvalid:loginValidationReducer,
    userRegistration:registrationReducer,
    changePwdReducer:changePwdReducer,
    testvalid:testFormValid,
    postsReducer:postsReducer,
    singlePostReducer:singlePostReducer,
})


export default rootReducer;