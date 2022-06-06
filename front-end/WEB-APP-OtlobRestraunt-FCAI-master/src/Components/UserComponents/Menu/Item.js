import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, ButtonGroup, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {Navigate, useParams} from "react-router-dom";
import {BsBag} from "react-icons/bs";
import ToastMsg from "../Toast";
import Api from "../../Apis/Base";
import Load from "../../Load";


let items = [];
let item = "";
const Item = () => {
    const {name} = useParams();
    let msg = "Item is added to cart";

    let [size, setSize] = useState(1);
    let [show, setShow] = useState(false);
    let [wait, setWait] = useState(false);
    let [num, setNum] = useState(1);
    let [load, setLoad] = useState(false);
    let [loadItem, setLoadItem] = useState(false);
    let [loadButton, setLoadButton] = useState(true);

    const getItem = () => {
        Api.apiToken.get(`common/getItem/${name}`).then((res) => {
            if (res.status === 200) {
                item = res.data;
                setLoad(true)
            }

        }).catch((e) => {
            console.log(e)
        })
    }


    const updateItem = () => {

        Api.apiToken.post("user/orderItem", {
            quantity: num,
            size: size,
            itemName: item.itemName,
            userEmail: Api.email,

        }).then((res) => {
            if (res.status === 200) {
                setWait(true);
                setShow(true);
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {

        getItem();

    }, [])

    let incNum = () => {
        if (num < 9) {
            setNum(Number(num) + 1);
        } else {
            setNum(9);
        }

    };
    let decNum = () => {
        if (num - 1 > 0) {
            setNum(num - 1);
        } else {
            setNum(1);
        }
    }
    let handleChange = (e) => {
        setNum(e.target.value);
    }


    if (wait === true && show === false) {

        setTimeout(() => {
            setLoadButton(true)
        }, 1000)

        return <Navigate to={"/menu/all"}/>
    }

    return (
        <>
            <Container fluid className="header-menu">
                <Col xs={3}>
                    <h1 style={{paddingTop: "300px"}}>Menu Item</h1>
                    <h6>{item.categoryName} / {name}</h6>
                </Col>

            </Container>

            <Container fluid className="item">
                {load ?
                    <Row>
                         <ToastMsg msg={msg} show={show} setShow={() => setShow(false)}/>
                        <Col sm={true}>
                            <Image roundedCircle={true} src={item.img} width="80%"/>
                        </Col>


                        <Col>
                            <h1 style={{
                                textAlign: "left",
                                fontWeight: "bold",
                                marginBottom: "40px"
                            }}>{item.itemName}</h1>
                            <h4 style={{
                                textAlign: "left",
                                fontWeight: "bold",
                                color: "grey",
                                marginBottom: "20px"
                            }}>{item.price}$</h4>
                            <p style={{textAlign: "left", marginBottom: "40px"}}>{item.des}</p>

                            <Row style={{marginBottom: "40px"}} xs={"auto"}>
                                <Col><h5 style={{textAlign: "left", fontWeight: "bold"}}>Size: </h5></Col>
                                <Col> <Button className="button-size" value={1}
                                              onClick={() => setSize(1)}>S</Button></Col>
                                <Col> <Button className="button-size" value={2}
                                              onClick={() => setSize(2)}>M</Button></Col>
                                <Col> <Button className="button-size" value={3}
                                              onClick={() => setSize(3)}>L</Button></Col>
                            </Row>

                            <h5 style={{textAlign: "left", fontWeight: "bold", marginBottom: "20px"}}>Quantity</h5>

                            <Row xs={"auto"}>
                                <Col style={{marginTop: "40px", marginRight: "30px"}}>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Button className="button-counter" onClick={decNum}>-</Button>
                                        <input type="text" disabled className="form-control" value={num}
                                               onChange={handleChange}
                                               style={{width: "35px", background: "none"}}/>
                                        <Button className="button-counter" onClick={incNum}>+</Button>
                                    </ButtonGroup>
                                </Col>

                                <Col>
                                    <Button className="buttons" onClick={() => {
                                        updateItem();
                                        setLoadButton(false);
                                    }}>
                                        Order <BsBag className="buttonIcon"/>
                                        {loadButton ?
                                            null
                                            :
                                            <Spinner animation="border" size={"sm"}
                                                     style={{color: "#ffffff", marginLeft: "8%"}}/>
                                        }
                                    </Button>{''}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    :
                    <Load style={{width: "80px", height: "80px"}}/>

                }

            </Container>


        </>

    );
}

export default Item;
