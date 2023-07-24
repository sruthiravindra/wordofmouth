export const validateUserLoginForm = (values) => {
    const errors = {};
    if(!values.email){
        errors.email = 'Required';
    }else if(!values.email.includes('@')){
        errors.email = 'Email should contain a @';
    }

    if(!values.password){
        errors.password = 'Required';
    }

    return errors;
}