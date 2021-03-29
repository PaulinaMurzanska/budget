import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './LoginPageContainer.scss';
import LoadingPage from "components/LoginPage/LoadingPage";
import LoginPageContainer from "components/LoginPage/LoginPageContainer";
import {Api} from "Services/Api";


const LoginPage = ({onTokenObtained}) => {
    const isDestroyed = useRef(false);
    const [loginInProgress, setLoginInProgress] = useState(false);

    /**
     * @param {Credentials} credentials
     * @param {function} onSubmitError
     * @return
     */
    const onSignIn = (credentials, onSubmitError) => {
        setLoginInProgress(true);

        const onSignInErrorFn = (error) => onSignInError(error, onSubmitError);

        return axios.post(Api.AUTH_TOKEN, credentials)
            .then(onSignInSuccess)
            .catch(onSignInErrorFn)
            .finally(onSignInFinally);
    };

    const onSignInError = (error, onSubmitError) => {
        const api = new Api();
        const {errors, status} = api.getErrorsFromApi(error);
        onSubmitError(errors, status);
    };

    const onSignInFinally = () => {
        if (isDestroyed.current === false) {
            setLoginInProgress(false);
        }
    };

    const onSignInSuccess = (response) => {
        const {token} = response.data;
        onTokenObtained(token);
    };

    useEffect(() => {
        isDestroyed.current = false;
        return () => {
            isDestroyed.current = true;
        };
    });

    return (

        <React.Fragment>
            {/*<LoadingPage visible={loginInProgress}/>*/}
            <LoginPageContainer onSubmit={onSignIn} visible={!loginInProgress}/>

        </React.Fragment>

    );
};

// LoginPage.propTypes = {
//     onTokenObtained: PropTypes.func.isRequired,
// };


export default LoginPage;