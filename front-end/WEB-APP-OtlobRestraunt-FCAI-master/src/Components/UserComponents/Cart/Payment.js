import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, Card, Col, Collapse, Container, Form, Row, Spinner} from "react-bootstrap";
import CartContent from "./CartContent";
import {Link, Navigate} from "react-router-dom";
import {FaMoneyBillWave} from "react-icons/fa";
import {BsCreditCard} from "react-icons/bs";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import ToastMsg from "../Toast";
import Api from "../../Apis/Base";
import Load from "../../Load";


let items = []
let phone = '';
let address = '';
let price = ''
const Payments = (props) => {
    let [loadButton, setLoadButton] = useState(true);
    let [load, setLoad] = useState(false)
    let [load2, setLoad2] = useState(false)
    const [open, setOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [hide, setHide] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const [cash, setCash] = useState(false)
    const [pay, setPay] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            Api.apiToken.get(`user/getCart/${Api.email}`).then((res) => {
                if (res.status === 200) {
                    Object.entries(res.data.orders).map(function (obj, _) {
                        items.push(obj[1].itemName)
                    })

                    phone = res.data.phone
                    address = res.data.address

                    setLoad(true)


                }
            }).catch((e) => {
                console.log(e)
            })

        }, 1000)
    }, [])

    const submit = () => {
        Api.apiToken.post(`user/orderCart`, {
            userEmail: Api.email,
            phone: phone,
            address: address,
            itemName: items
        }).then((res) => {
            if (res.status === 200) {
                price = res.data
                setLoad2(true)

            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const send = () => {
        Api.apiToken.post(`user/clearCart`, {
            email: Api.email,
        }).then((res) => {
            if (res.status === 200) {
                setRedirect(true)
                setHide(true);
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    if (redirect === true && hide === false) {
        setTimeout(() => {
            setLoadButton(true)
        }, 1000)
        return <Navigate to={"/"}/>
    }

    return (

        <Container className="pay">
            <Container className="pay-item">
                <h5 style={{textAlign: "left"}}>Order Summary</h5>
                <hr/>
                <CartContent/>
            </Container>

            <Container className="pay-item">
                <Row>
                    <Col>
                        <h5 style={{textAlign: "left"}}>Delivery Address</h5>
                    </Col>
                    <Col>
                        <Link to='/info' style={{
                            textAlign: "right",
                            color: "green",
                            cursor: "pointer",
                            textDecoration: "none"
                        }}>Edit</Link>
                    </Col>
                </Row>
                <hr/>
                {
                    load ?
                        (
                            <>
                                <h6 style={{textAlign: "left"}}>Address: {address}</h6>
                                <h6 style={{textAlign: "left"}}>Mobile: {phone}</h6>
                            </>
                        )
                        :
                        <Load style={{width: "80px", height: "80px"}}/>
                }

            </Container>

            <Container className="pay-item">
                <h5 style={{textAlign: "left"}}>Payment Summary</h5>
                <hr/>
                <Row>
                    <Col style={{padding: "20px"}}>
                        <Card style={{marginBottom: "30px"}}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Check className="selectButton" onClick={() => {
                                            setCash(!cash);
                                            submit()
                                            setPay(true);
                                        }} type="radio"
                                                    aria-label="radio 1" disabled={cash}/>
                                    </Col>
                                    <Col>
                                        <FaMoneyBillWave/> Cash
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>


                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Check className="selectButton" type="radio" aria-label="radio 1"
                                                    onClick={() => {
                                                        setOpen(!open);
                                                        setCash(!cash);
                                                        setPay(true);
                                                        submit()
                                                    }}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={open} disabled={cash}/>
                                    </Col>

                                    <Col>
                                        <BsCreditCard/>
                                        Debit/Credit card OR PAYPAL
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Collapse in={open} dimension="width">
                            <Row id="example-collapse-text" style={{marginTop: "30px"}}>
                                <PayPalScriptProvider
                                    options={{"client-id": "AW2kGwj9lfwDL0EGQrwZvn8PMJFn64A4CupooLx-45efplxr6PjCPni5U1oUERX4A9AWDb_2JjD7ldUU&currency=CAD"}}>
                                    <PayPalButtons
                                        style={{layout: 'vertical'}}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: price,
                                                        },

                                                    },

                                                ],

                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            const order = actions.order.capture();
                                            // setClick(true)
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </Row>
                        </Collapse>

                    </Col>

                    <Col>
                        <ToastMsg show={hide} setShow={() => setHide(false)} msg={"Your order in progress"}/>

                        {

                            load2 ?
                                <Card style={{padding: "10px", border: "none"}}>
                                    <Card.Body>
                                        <Row style={{marginBottom: "20px"}}>
                                            <Col style={{textAlign: "left"}}>Subtotal</Col>
                                            <Col style={{textAlign: "right"}}>{price}.00$</Col>

                                        </Row>
                                        <Row style={{marginBottom: "20px"}}>
                                            <Col style={{textAlign: "left"}}>Delivery fee</Col>
                                            <Col style={{textAlign: "right"}}>4.00$</Col>
                                        </Row>
                                    </Card.Body>

                                    <Card.Footer>
                                        <Row>
                                            <Col style={{textAlign: "left", fontWeight: "bold"}}>Total Amount</Col>
                                            <Col style={{
                                                textAlign: "right",
                                                fontWeight: "bold"
                                            }}>{price + parseInt(4)}.00$</Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                :
                                null

                        }


                        <Button disabled={!(pay)} onClick={() => {
                            send()
                            setLoadButton(false);
                        }} className='buttonSubmit'>
                            Order
                            {loadButton ?
                                null
                                :
                                <Spinner animation="border" size={"sm"}
                                         style={{color: "#ffffff", marginLeft: "8%"}}/>
                            }
                        </Button>
                    </Col>

                </Row>
            </Container>

        </Container>
    );
}

export default Payments;
