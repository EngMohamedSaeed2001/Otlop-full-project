import React from "react";
import '../index.css';
import {Image} from "react-bootstrap";

const Load = (props) => {
    return (
        <Image roundedCircle src="/images/load.png" width={100} height={100} className="rotate"/>
    );
}

export default Load;
