import React, {useState} from 'react'
import {Button, Card, CardGroup, Col, Container, Form, Image, InputGroup, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';
import ToastMsg from '../Toast';
import {Navigate} from 'react-router-dom';
import Api from "../../Apis/Base"

const ContactUS = () => {

    let [firstName, setFirstName] = useState("")
    let [secondName, setSecondName] = useState("")
    let [subject, setSubject] = useState("")
    let [message, setMessage] = useState("")
    let [email, setEmail] = useState("")
    let [load, setLoad] = useState(false)
    let [show, setShow] = useState(false)

    const sendContactMessage = () => {
        Api.apiToken.post("user/addContactInfo", {
                firstName: firstName,
                secondName: secondName,
                email: email,
                subject: subject,
                message: message
            }
        ).then((res) => {
            if (res.status === 200) {
                setLoad(true)
                setFirstName("")
                setSecondName("")
                setEmail("")
                setMessage("")
                setSubject("")
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    if (load === true && show === false) {
        return <Navigate to={"/"}/>
    }
    return (
        <Container fluid>
            <Row xs="auto">
                <Col lg={true} className='mapSection'>
                    <ToastMsg show={show} setShow={() => setShow(false)} msg="Thanks for conatcing Us"/>
                    <Image src="/images/x.png" className='map'>

                    </Image>
                    <Button variant="primary" type="submit" className='buttonSubmit'>
                        View on maps
                    </Button>
                </Col>
                <Col lg={true} className='cardSection'>
                    <Row>
                        <CardGroup className='cards'>
                            <Card border="danger" className='ct-info-box'>
                                <Card.Header>Find Us</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        445 Mount Eden Road, Mount Eden
                                        <br></br>
                                        21 Greens Road RD 2 Ruawai 0592
                                        <br></br>
                                        +123 456 789
                                        <br></br>
                                        info@example.com
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card border="danger" className='ct-info-box'>
                                <Card.Header>Opening Hours</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Mon - Wed: 8:00am - 8:00pm
                                        <br></br>
                                        Thu: 8:00am - 5:00pm
                                        <br></br>
                                        Fri: 8:00am - 8:00pm
                                        <br></br>
                                        Sat - Sun: 8:00am - 2:00pm
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Row>

                    <Row className='formSection'>
                        <Form className='form'>
                            <h1 className='title'>Send us a message</h1>
                            <h6 className='subTitle'>We will be in touch with you shortly</h6>
                            <Row>
                                <InputGroup style={{width: "100%"}} hasValidation controlId="firstName">
                                    <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"
                                                  required placeholder='First Name'/>
                                </InputGroup>

                            </Row>
                            <br></br>
                            <Row>
                                <InputGroup hasValidation controlId="secondeName">
                                    <Form.Control value={secondName} onChange={(e) => setSecondName(e.target.value)}
                                                  type="text" required placeholder='Seconde Name'/>
                                </InputGroup>
                            </Row>
                            <br></br>
                            <Row>
                                <InputGroup hasValidation controlId="email">
                                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                                                  placeholder='Email'/>
                                </InputGroup>

                            </Row>
                            <br></br>
                            <Row>
                                <InputGroup hasValidation controlId="formSubject">
                                    <Form.Control value={subject} onChange={(e) => setSubject(e.target.value)} type="text"
                                                  required  placeholder='Subject'/>
                                </InputGroup>
                            </Row>
                            <br></br>
                            <Row>
                                <InputGroup hasValidation controlId="formMessage">
                                    <Form.Control value={message} onChange={(e) => setMessage(e.target.value)} as="textarea"
                                                  rows={6} required
                                                  placeholder="Type your Message"/>
                                </InputGroup>
                            </Row>
                            <br></br>
                            <Button variant="primary" className='buttonSubmit' onClick={() => sendContactMessage()}>
                                Send message
                            </Button>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>

    )
}
export default ContactUS;


