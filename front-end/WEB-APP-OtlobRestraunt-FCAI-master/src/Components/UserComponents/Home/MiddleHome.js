import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import CardContainer from "./CardSlider";
import Load from "../../Load";

const cardsData = [
    {
        id: 1,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 2,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 3,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 4,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 5,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 6,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 7,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 8,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 9,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },
    {
        id: 10,
        title: 'Pizza',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
        price: "14.99$",
        imgUrl: 'http://androthemes.com/themes/react/slices/assets/img/prods-sm/5.png'
    },

]

const MiddleHome = (props) => {
    let [data, setData] = useState([])
    useEffect(() => {
        setData(props.cat);
    })
    return (
        <Container fluid className="header">
            <Row className="content">
                <Col lg={true}>
                    <Image src="http://androthemes.com/themes/react/slices/assets/img/auth.jpg"
                           style={{maxWidth: "100%"}}/>
                </Col>

                <Col lg={true}>
                    <Row><h2 className="title">Serving Pizzas By The Slice Since 1987</h2></Row>
                    <Row><p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has
                        been
                        the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry.

                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p></Row>

                    <Row>
                        <img src="http://androthemes.com/themes/react/slices/assets/img/signature.png"
                             style={{maxWidth: "40%", height: "auto", width: "auto", marginTop: "50px"}}/>
                    </Row>
                    <Row>
                        <Link to={`/menu/${"all"}`}>
                            <Button className="buttons">
                                Check our menu
                            </Button>{''}
                        </Link>
                    </Row>
                </Col>
            </Row>

            {/*TWO MENUS*/}
            <Row className="content">
                <Col lg={true}>
                    <Image src={"/images/pexels-pixabay-315755.jpg"} style={{maxWidth: "100%"}}/>
                </Col>

                <Col lg={true}>
                    <Row><h5 style={{color: "#ed4e53", marginBottom: "30px"}}>Pizza Menu</h5></Row>
                    <Row><h1>Our Passion, Our Heritage, Our Pizzas</h1></Row>
                    <Row className="item"><p className="desc">Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's standard dummy</p></Row>

                    {
                        props.load === true ?

                            Array.apply(0, Array(4)).map(function (x, i) {
                                return (
                                    <Row className="item" id={i} xs={2}>
                                        {
                                            props.items.map(function (item, ind) {
                                                return (
                                                    <Col id={item.id}>
                                                        <Row>
                                                            <h5>{item.itemName} <span
                                                            >....... </span> <span
                                                                style={{color: "#ed4e53"}}>{item.price}$</span></h5>
                                                        </Row>
                                                        <Row><p>{item.des}</p></Row>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                )
                            })

                            :
                            <Spinner animation="grow"
                                     style={{color: "#ed4e53", width: "80px", height: "80px", margin: "auto"}}/>
                    }

                </Col>
            </Row>

            <Row className="content">
                <Col lg={true}>
                    <Row><h5 style={{color: "#ed4e53", marginBottom: "30px"}}>Pasta Menu</h5></Row>
                    <Row><h1>Did Someone Say Italian Food?</h1></Row>
                    <Row className="item"><p className="desc">Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's standard dummy</p></Row>

                    {
                        props.load === true ?

                            Array.apply(0, Array(4)).map(function (x, i) {
                                return (
                                    <Row className="item" id={i} xs={2}>
                                        {
                                            props.items.map(function (item, ind) {
                                                return (
                                                    <Col id={item.id}>
                                                        <Row>
                                                            <h5>{item.itemName} <span
                                                            >........... </span> <span
                                                                style={{color: "#ed4e53"}}>{item.price}$</span></h5>
                                                        </Row>
                                                        <Row><p>{item.des}</p></Row>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                )
                            })

                            :
                            <Load style={{width: "80px", height: "80px", margin: "auto"}}/>
                    }
                </Col>

                <Col lg={true}>
                    <Image src={"/images/pexels-klaus-nielsen-6287493.jpg"} style={{maxWidth: "100%"}}/>
                </Col>
            </Row>

            {/*///////////////////////////////////////////*/}

            {/*SLIDER*/}
            <Row className="content">
                <Row><h5 style={{color: "#ed4e53", marginBottom: "30px"}}>Trending</h5></Row>
                <Row><h1>Our Customers' Top Picks</h1></Row>
                <Row className="item"><p style={{maxWidth: "500px", margin: "auto", color: "#848486"}}>Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy</p></Row>

                <Link to="/item" style={{textDecoration: "none"}}>
                    <CardContainer cards={props.items} load={props.load}/>
                </Link>
            </Row>

            {/*///////////////////////////////////////////*/}
        </Container>
    );
}

export default MiddleHome;
