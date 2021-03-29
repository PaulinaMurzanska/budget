import React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import LoginForm from "components/LoginPage/LoginForm";
// import 'pages/styles/LoginPageContainer.scss';
import './LoginPageContainer.scss';
import classNames from 'classnames';
import Container from "@material-ui/core/Container"
import logo from "images/logo 2.png";

const LoginPageContainer = React.memo(({onSubmit, visible}) => {
    const className = classNames(
        'h-100',
        {'d-none': !visible}
    );
    return (
        <Container maxWidth="lg" className="main-container">
            <div className="login-form-wrapper">
                <div className="logo">
                    <img src={logo} alt='home budget'/>
                </div>
                <div className="login-details">
                    <LoginForm onSubmit={onSubmit}/>
                </div>
                <p>No account yet ?</p>
                <a href="http://127.0.0.1:8000/members/register/">Register here</a>
            </div>
        </Container>
    );
});

export default LoginPageContainer;