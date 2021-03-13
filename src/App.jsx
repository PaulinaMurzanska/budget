import React, {Suspense, useEffect, useState} from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Auth from "Services/Auth";
import LoginPage from "components/LoginPage/LoginPage";
import LoadingPage from "components/LoginPage/LoadingPage";
import "./App.scss";

const Authenticated = React.lazy(() => import('components/AuthenticatedPage/AuthenticatedPage'));
const App = () => {
    const [token, setToken] = useState(Auth.getTokenFromStorage());
    const isAuthenticated = token && token !== Auth.emptyToken;

    const onTokenObtained = (token) => {
        Auth.putTokenToStorage(token);
        setToken(token);
    };
    const onLogout = () => onTokenObtained(Auth.emptyToken);


    useEffect(Auth.appendAxiosAuthorizationHeader(token), [token]);

    return (
        <Suspense fallback={<LoadingPage/>}>
            {
                isAuthenticated ?
                    <Authenticated onLogout={onLogout}/> :
                    <LoginPage onTokenObtained={onTokenObtained}/>
            }
        </Suspense>

    )
}
export default App;