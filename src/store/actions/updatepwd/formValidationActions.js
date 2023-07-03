exports.testvalidation=(val)=>{
    return { 
        type:'testvalidation',
        testValidation:val.validated ,
        samePwd:val.samePwd
    }
 }

 