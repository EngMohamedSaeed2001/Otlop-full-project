import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Location.css';
import {Button, Card, Col, Container, Image, Row} from 'react-bootstrap';

const Location = () => {
    return (
        <Container fluid>
            <Row xs="auto">
                <Row>
                    <Col lg={true}>
                        <Card className='locationCard' border="light">
                            <Card.Img className='locationImg' variant="top" src="/images/1.jpg"/>
                            <Card.Body className='cardBody'>
                                <Card.Title className='cardTitle'>Slices London </Card.Title>
                                <Card.Subtitle as="h7" className='cardTitle'>Main Branch</Card.Subtitle>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                            Iris Watson
                                            <br></br>
                                            <span> P.O. Box 283 8562 Fusce Rd.</span>
                                            <br></br>
                                            <span>Frederick Nebraska 20620</span>
                                        </Col>
                                        <Col>
                                            <span>Give us a call:</span>
                                            <br></br>
                                            (372) 587-2335
                                            <br></br>
                                            Email Us:
                                            <br></br>
                                            info@slices-dc.com
                                        </Col>
                                    </Row>
                                </Card.Text>
                                <Button variant="primary" className='btncustom'>VIEW ON GOOGLE MAPS</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={true}>
                        <Image className='map' src="/images/y.png"/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={true}>
                        <Card className='locationCard' border="light">
                            <Card.Img className='locationImg' variant="top" src="/images/2.jpg"/>
                            <Card.Body className='cardBody'>
                                <Card.Title className='cardTitle'>Slices Italy </Card.Title>
                                <Card.Subtitle as="h7" className='cardTitle'>Main Branch</Card.Subtitle>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                            Iris Watson
                                            <br></br>
                                            <span> P.O. Box 283 8562 Fusce Rd.</span>
                                            <br></br>
                                            <span>Frederick Nebraska 20620</span>
                                        </Col>
                                        <Col>
                                            <span>Give us a call:</span>
                                            <br></br>
                                            (372) 587-2335
                                            <br></br>
                                            Email Us:
                                            <br></br>
                                            info@slices-dc.com
                                        </Col>
                                    </Row>
                                </Card.Text>
                                <Button variant="primary" className='btncustom'>VIEW ON GOOGLE MAPS</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={true}>
                        <Image className='map' src="/images/y.png"/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={true}>
                        <Card className='locationCard' border="light">
                            <Card.Img className='locationImg' variant="top" src="/images/3.jpg"/>
                            <Card.Body className='cardBody'>
                                <Card.Title className='cardTitle'>Slices Washington </Card.Title>
                                <Card.Subtitle as="h7" className='cardTitle'>Main Branch</Card.Subtitle>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                            Iris Watson
                                            <br></br>
                                            <span> P.O. Box 283 8562 Fusce Rd.</span>
                                            <br></br>
                                            <span>Frederick Nebraska 20620</span>
                                        </Col>
                                        <Col>
                                            <span>Give us a call:</span>
                                            <br></br>
                                            (372) 587-2335
                                            <br></br>
                                            Email Us:
                                            <br></br>
                                            info@slices-dc.com
                                        </Col>
                                    </Row>
                                </Card.Text>
                                <Button variant="primary" className='btncustom'>VIEW ON GOOGLE MAPS</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={true}>
                        <Image className='map' src="/images/y.png"/>
                    </Col>
                </Row>
            </Row>
        </Container>


    )
}
export default Location;