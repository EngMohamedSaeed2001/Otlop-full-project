import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Spinner} from "react-bootstrap";
import App from './App';
import reportWebVitals from './reportWebVitals';


const loadingMarkup = (

    <Spinner animation="grow" style={{color: "#ed4e53", width: "100px", height: "100px", margin: "auto"}}/>

)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<Suspense fallback={loadingMarkup}>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    // </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
