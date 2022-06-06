import React, {useEffect, useState} from "react";
import "../../../index.css";
import {Button, Col, Offcanvas, Row} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import CartContent from "./CartContent";
import Api from "../../Apis/Base";

let items = []

function Cart(props) {
    let [show, setShow] = useState(props.show)
    let [empty, setEmpty] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            Api.apiToken.get(`user/getCart/${Api.email}`).then((res) => {
                if (res.status === 200) {
                    Object.entries(res.data.orders).map(function (obj, _) {
                        items.push(obj[1])

                    })
                }
            }).catch((e) => {
                console.log(e)
            })

        }, 1000)
    }, [])

    if (empty) {
        return <Navigate to={"/info"}/>
    }
    return (
        <>
            <Offcanvas style={{width: "850px"}} show={show} onHide={props.setShow} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h2 style={{fontWeight: "bold", margin: "10px"}}>YOUR CART</h2></Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <CartContent/>

                    <Row>

                        <Col style={{marginBottom: "50px", marginLeft: "100px"}}>

                            <Button className="buttons" onClick={() => {
                                setShow(false);
                                if (items.length !== 0)
                                    setEmpty(true)
                            }}>
                                Check out
                            </Button>{''}

                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default Cart;