import React from "react";
import '../../../../index.css';
import {Container, Image} from "react-bootstrap";


const Wait = () => {
    return (
        <Container fluid style={{backgroundColor: "#fff", height: "100vh", marginTop: "30px"}}>
            <Container className="wait">
                <h2>Check Your Inbox</h2>
                <Image
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5cKxRR4gihE4hxw8Nf2yds0ehGAIP9st4aYLIAr0eXBeMwV_Q36yLaGpXsV8z53KqHbg&usqp=CAU"}
                    style={{marginTop: "40px"}} width={"35%"}/>
            </Container>
        </Container>
    );
}

export default Wait;
