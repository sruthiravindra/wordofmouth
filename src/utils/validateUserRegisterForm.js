export const validateUserRegisterForm = (values) => {
    const errors = {};

    if(!values.firstName){
        errors.firstName = 'Required';
    }else if(values.firstName.length < 6){
        errors.firstName = 'Firstname should not be less than 6 characters';
    }else if(values.firstName.length > 15){
        errors.firstName = 'Firstname shoule be less than 15 characters';
    }

    if(!values.email){
        errors.email = 'Required';
    }else if(!values.email.includes('@')){
        errors.email = 'Email should contain a @';
    }

    if(!values.password){
        errors.password = 'Required';
    }

    if(values.password != values.confirmPassword){
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}