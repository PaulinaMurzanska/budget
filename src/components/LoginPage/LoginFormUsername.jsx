import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import AppInput from "SharedComponents/AppInput";
import loginFormFields from "components/LoginPage/LoginFormFields";

const LoginFormUsername = (props) => {
  const id = "userLoginUsername";
  return (
    <FormGroup>
      <Label for={ id } className="login-label">
        Login:
      </Label>
      <Field
          className='login-input'
        component={ AppInput }
        id={ id }
        name={ loginFormFields.USERNAME }
        placeholder="username"
        type="text"
      />
    </FormGroup>
  );
};

LoginFormUsername.propTypes = {};

export default LoginFormUsername;
