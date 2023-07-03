
exports.loginvalidation=(val)=>{
    return { 
        type:'loginvalidation',
        loginValidation:val.validated ,
        samePwd:val.samePwd
    }
 }

 