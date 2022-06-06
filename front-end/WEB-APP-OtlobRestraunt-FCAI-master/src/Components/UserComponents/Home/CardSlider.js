import React from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {BsBag} from "react-icons/bs";
import {Link} from "react-router-dom";
import Load from "../../Load";

const Cardss = (props) => (

    <Card style={{width: '25rem'}} className="cardss" id={props.id}>
        <Link to={`/item/${props.name}`}>
            <Card.Img className="card-image" variant="top" src={props.img} />
        </Link>
        <Card.Body>
            <Card.Title className="card-name">{props.name}</Card.Title>
            <Card.Text className="card-desc">{props.desc}</Card.Text>
        </Card.Body>

        <Card.Body>
            <Card.Footer style={{background: "none"}}>
                <Row xs={2}>
                    <Col style={{marginTop: "15px"}}>
                        <p style={{fontWeight: "bold", color: "black"}}>$ {props.price}</p>
                    </Col>

                    <Col>
                        <Card.Link href={`/item/${props.name}`}>
                            <Button className="card-button">
                                Order <BsBag className="buttonIcon"/>
                            </Button>{''}
                        </Card.Link>
                    </Col>
                </Row>
            </Card.Footer>
        </Card.Body>
    </Card>
);

const CardContainer = (props) => (
    <Container className="cards-container">
        {
            props.load ?

                props.cards.map((card) => (
                    <Cardss
                        id={card.id}
                        name={card.itemName}
                        desc={card.des}
                        img={card.img}
                        price={card.price}
                    />
                ))

                : <Load style={{width: "80px", height: "80px", margin: "auto"}}/>
        }
    </Container>
);

export default CardContainer;