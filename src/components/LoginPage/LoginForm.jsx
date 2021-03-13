import {Button} from 'reactstrap';
import React from 'react';
import {Form, Formik} from 'formik';
import loginFormFields from "components/LoginPage/LoginFormFields";
import LoginFormUsername from "components/LoginPage/LoginFormUsername";
import LoginFormPassword from "components/LoginPage/LoginFormPassword";
import NonFieldErrors from "components/LoginPage/NonFieldError";

const LoginForm = (props) => {
    const formFields = loginFormFields;

    const initialValues = formFields.getInitialValues();
    const initialStatus = formFields.getInitialStatus();
    const validationSchema = formFields.getValidationSchema();
    const validateOnMount = formFields.getValidateOnMount();

    /**
     *
     * @param {ApiErrors} apiErrors
     * @param {number} httpStatusCode
     * @param {FormikValues} values
     * @param {function} resetForm
     */
    const onSubmitError = (apiErrors, httpStatusCode, values, resetForm) => {
        const status = formFields.getStatusFromApi(apiErrors, httpStatusCode);
        resetForm({values, status});
    };

    /**
     *
     * @param {FormikValues} values
     * @param {FormikBag} formikBag
     */
    const onSubmit = (values, formikBag) => {
        const credentials = formFields.toModel(values);
        const {resetForm} = formikBag;
        const onSubmitApiErrors = (apiErrors, httpStatusCode) => onSubmitError(apiErrors, httpStatusCode, values, resetForm);
        return props.onSubmit(credentials, onSubmitApiErrors);
    };

    const formikProps = {
        initialValues,
        initialStatus,
        validateOnMount,
        onSubmit,
        validationSchema,
    };

    return (
        <Formik {...formikProps}>
            {({isValid}) => (
                <Form className="login-form">
                    <NonFieldErrors label={'Unable to login - server may not be responding - please try again'}/>
                    <div className="login-field-wrapper">
                        <LoginFormUsername/>
                    </div>
                    <div className="login-field-wrapper">
                        <LoginFormPassword/>
                    </div>

                    <button type="submit" className="mt-3" disabled={!isValid}>
                        Sign In
                    </button>
                </Form>
            )}
        </Formik>
    );

};


export default LoginForm;