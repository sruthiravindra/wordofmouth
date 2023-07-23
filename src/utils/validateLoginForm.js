export const validateLoginForm = (values) => {
    const errors = {};
    console.log(values);
    if(!values.email){
        errors.email = 'Required';
    }else if(!values.email.includes('@')){
        errors.email = 'Email should contain a @';
    }

    if(!values.password){
        errors.password = 'Required';
    }
    console.log(errors);

    return errors;
}