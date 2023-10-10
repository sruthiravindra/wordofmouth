export const validateUserLoginForm = (values) => {
    const errors = {};
    const {email,password} = values;

    if(!email){ // check if field is empty
        errors.email = 'Required';
    }else if(!email.includes('@')){ // check if not an email id then check if a valid phone number
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        if((!email || regex.test(email) === false)){
            errors.email = 'Enter a valid email id or phone number';
        }
    }else{ // check if its valid email id
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            errors.email = 'Enter a valid email id or phone number';
        }
    }

    if(!password){
        errors.password = 'Required';
    }

    return errors;
}