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

    if(!values.email){
        errors.email = 'Required';
    }else if(!values.email.includes('@')){
        errors.email = 'Email should contain @';
    }

    if(!values.password){
        errors.password = 'Required';
    }

    if(values.password != values.confirmPassword){
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}