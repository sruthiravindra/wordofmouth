export const validateUserEditProfileForm = (values) => {
    const errors = {}

    if(!values.first_name){
        errors.first_name = 'Required';
    }else if(values.first_name.length < 2){
        errors.first_name = 'must be at least 2 characters';
    }else if(values.first_name.length > 15){
        errors.first_name = 'cannot be more than 15 characters';
    }

    if(!values.last_name){
        errors.last_name = 'Required'
    }else if(values.last_name.length < 2){
        errors.last_name = 'must be at least 2 characters'
    }else if(values.last_name.length > 15){
        errors.last_name='cannot be more than 15 characters'
    }

    if (!values.address_line_1){
        errors.address_line_1 = 'Required'
    }else if(values.address_line_1.length > 30){
        errors.address_line_1 = 'cannot be more than 30 characters'
    }

    if (values.address_line_2){
        if(values.address_line_2.length > 30){
            errors.address_line_2 = 'cannot be more than 30 characters'
        }
    }

    if (values.address_line_3){
        if(values.address_line_3.length > 30){
            errors.address_line_3 = 'cannot be more than 30 characters'
        }
    }

    if(!values.city){
        errors.city = 'Required'
    }else if(values.city.length < 2){
        errors.city = 'must be at least 2 characters'
    }else if(values.city.length > 20){
        errors.city='cannot be more than 20 characters'
    }

    if(!values.province){
        errors.province = 'Required'
    }else if(values.province.length < 2){
        errors.province = 'must be at least 2 characters'
    }else if(values.province.length > 20){
        errors.province='cannot be more than 20 characters'
    }

    if(!values.postal_code){
        errors.postal_code = 'Required'
    }else if(values.postal_code.length < 2){
        errors.postal_code = 'must be at least 2 characters'
    }else if(values.postal_code.length > 15){
        errors.postal_code='cannot be more than 15 characters'
    }

    if(!values.country){
        errors.country = 'Required'
    }else if(values.country.length < 2){
        errors.country = 'must be at least 2 characters'
    }else if(values.country.length > 25){
        errors.country='cannot be more than 125 characters'
    }

    return errors;
}