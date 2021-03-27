import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import 'core-js/proposals/reflect-metadata';
import 'styles/bootstrap-pre-custom.sass';
import 'styles/bootstrap-post-custom.sass';
import reportWebVitals from './reportWebVitals';
import {Api} from "Services/Api";
import axios from "axios";
import * as serviceWorker from './ServiceWorker';


axios.defaults.baseURL = Api.baseUrl;


axios.defaults.timeout = Api.timeout;


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
