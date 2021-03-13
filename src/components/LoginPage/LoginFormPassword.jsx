import React from "react";
import {FormGroup, Label} from "reactstrap";
import {Field} from "formik";
import AppInput from "SharedComponents/AppInput";
import loginFormFields from "components/LoginPage/LoginFormFields";

const LoginFormPassword = (props) => {
    const id = "userLoginPassword";
    return (
        <FormGroup>
            <Label for={id} className="login-label">
                Password:
            </Label>
            <Field
                className='login-input'
                component={AppInput}
                id={id}
                name={loginFormFields.PASSWORD}
                placeholder="password"
                type="password"
            />
        </FormGroup>
    );
};

LoginFormPassword.propTypes = {};

export default LoginFormPassword;
