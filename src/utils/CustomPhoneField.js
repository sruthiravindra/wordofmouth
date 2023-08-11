import React from "react";
import PhoneInput from "react-phone-number-input";
import PropTypes from "prop-types";
import 'react-phone-number-input/style.css'

const CustomPhoneField = React.forwardRef(
    ({ name, onChange, formik, ...rest }, ref) => (
        <PhoneInput {...rest} ref={ref} name={name} onChange={onChange} />
      )
    );
    

CustomPhoneField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    formik: PropTypes.shape({
      handleChange: PropTypes.func.isRequired,
      handleBlur: PropTypes.func.isRequired
    }).isRequired
  };

export default CustomPhoneField;