import React from "react";
import '../../../index.css';
import {Button, Carousel, Col, Container, Image, Row} from "react-bootstrap";
import {BsBag} from "react-icons/bs";
import {AiOutlineFire} from "react-icons/ai";
import {FaTint} from "react-icons/fa";
import {Link} from "react-router-dom";
import Load from "../../Load";

const Header = (props) => {

    return (
        <Container fluid className="header">
            <Carousel variant="dark">
                {props.load ?
                    props.items.map(function (item, ind) {
                        return (
                            <Carousel.Item accessKey={item.id}>
                                <Row>
                                    <Col>
                                        <Image
                                            roundedCircle
                                            src={item.img}
                                            alt={item.itemName}
                                            width={"350px"}
                                            style={{margin: "0 auto"}}
                                        />
                                    </Col>

                                    <Col>
                                        <Row className="item"><h1 className="title">{item.itemName}</h1></Row>
                                        <Row className="item"><h4>{item.itemName}</h4></Row>
                                        <Row className="item">
                                            <p className="desc">
                                                {item.des}
                                            </p>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p className="info"><span className="icons"><AiOutlineFire/></span><span
                                                    style={{fontWeight: "bold"}}>{item.calories}</span><br/>Calories</p>
                                            </Col>

                                            <Col>
                                                <p className="info"><span className="icons"><FaTint/></span> <span
                                                    style={{fontWeight: "bold"}}>{item.fats}g</span><br/>Fats</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Link to={`/item/${item.itemName}`}>
                                                    <Button className="button">
                                                        Order <BsBag className="buttonIcon"/>
                                                    </Button>{''}
                                                </Link>

                                            </Col>

                                            <Col>
                                                <p style={{
                                                    fontWeight: "bold",
                                                    fontSize: "25px",
                                                    marginTop: "10px",
                                                    marginBottom: "100px"
                                                }}>${item.price}</p>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Carousel.Item>
                        );
                    })
                    :
                    <Load style={{width: "80px", height: "80px", margin: "auto"}}/>
                }

            </Carousel>
        </Container>
    );
}

export default Header;
