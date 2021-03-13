import React from "react";
import Header from "components/Header/Header";
import {BrowserRouter as Router} from "react-router-dom"
import MainBody from "components/MainBody/MainBody";



const AuthenticatedPage = ({onLogout}) => {
    return (
        <Router>
            <MainBody onLogout={ onLogout }/>
        </Router>

    )
}
export default AuthenticatedPage;