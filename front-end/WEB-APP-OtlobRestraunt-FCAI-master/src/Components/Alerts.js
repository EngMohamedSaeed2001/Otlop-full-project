import React from "react";
import '../index.css';
import {Alert, Button} from "react-bootstrap";
import {Link} from "react-router-dom";


const Alerts = (props) => {
    return (
        <Alert show={props.show} variant="danger">
            <Alert.Heading>{props.msg}</Alert.Heading>

            <hr/>
            <div className="d-flex justify-content-end">
                <Link to={props.link}>
                    <Button onClick={props.setShow} variant="outline-danger">
                        Confirm
                    </Button>
                </Link>
            </div>
        </Alert>
    );
}

export default Alerts;
