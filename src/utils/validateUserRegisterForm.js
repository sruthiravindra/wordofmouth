export const validateUserRegisterForm = (values) => {
    const errors = {};

    if(!values.firstName){
        errors.firstName = 'Required';
    }else if(values.firstName.length < 2){
        errors.firstName = 'must be at least 2 characters';
    }else if(values.firstName.length > 15){
        errors.firstName = 'cannot be more than 15 characters';
    }

    if(!values.lastName){
        errors.lastName = 'Required'
    }else if(values.lastName.length < 2){
        errors.lastName = 'must be at least 2 characters'
    }else if(values.lastName.length > 15){
        errors.lastName='cannot be more than 15 characters'
    }

    if(!values.username){ // check if field is empty
        errors.username = 'Required';
    }else if(!values.username.includes('@')){ // check if not an email id then check if a valid phone number
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        if((!values.username || regex.test(values.username) === false)){
            errors.username = 'Enter a valid email id or phone number';
        }
    }else{ // check if its valid email id
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(values.username)){
            errors.username = 'Enter a valid email id or phone number';
        }
    }

    if(!values.password){
        errors.password = 'Required';
    }

    if(values.password != values.confirmPassword){
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}