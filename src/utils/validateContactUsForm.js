export const validateContactUsForm = (values)=>{
    const errors = {};
    if(!values.email){
        errors.email = "Required";
    }else if(!values.email.includes("@")){
        errors.email = "Email must contain @"
    }

    if(!values.subject){
        errors.subject = "Required";
    }

    if(!values.description){
        errors.description = "Required";
    }
    return errors;
}