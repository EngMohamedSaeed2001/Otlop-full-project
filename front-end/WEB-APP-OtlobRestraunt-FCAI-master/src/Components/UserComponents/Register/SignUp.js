import React, {useState} from "react";
import '../../../index.css';
import {Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner} from "react-bootstrap";
import {Formik} from 'formik';
import {object, string} from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import {Link, Navigate} from "react-router-dom";
import Social from "./Social";
import validator from "validator";
import api from "../../Apis/Base";
import ToastMsg from "../Toast";

const schema = object({

    email: string().required(),
    username: string().required(),
    password: string().required(),
});


const SignUp = () => {
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [done, setDone] = useState(true);
    let [loadButton, setLoadButton] = useState(true);
    let [wait, setWait] = useState(false);
    let [wrong, setWrong] = useState(false);
    let [msg, setMsg] = useState("");

    const addUser = () => {

        api.api.post("insecure/userDetails", {
            username: username,
            profileId: 2,
            email: email,
            social: false
        }).then((res) => {
            if (res.status === 201) {
                setWait(true);

                setEmail("")
                setUsername("")
                setDone(false)
                localStorage.setItem("user_email", email)
            }

        }).catch((e) => {

            setWrong(true)
            setMsg(e.response.data.message)
            setLoadButton(true)
        })
    }

    if (wait === true) {

        setTimeout(() => {
            setLoadButton(true)
        }, 1000)
        return <Navigate to={'/wait'}/>
    }

    return (
        <Container fluid>
            <Formik
                validationSchema={schema}
                onSubmit={console.log}
                initialValues={{
                    username: "",
                    email: '',
                    password: '',
                }}
            >
                {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors,
                  }) => (

                    <Container className="signup">
                        <Row>
                            <Col lg={true}>
                                <Image src={'http://androthemes.com/themes/react/slices/assets/img/auth.jpg'}
                                       style={{width: "100%", height: "100%"}}
                                />
                            </Col>

                            <Col lg={true}>
                                <h2 style={{marginTop: "50px", marginBottom: "30px", fontWeight: "bold"}}>Sign Up</h2>
                                <ToastMsg show={wrong} setShow={() => setWrong(false)} msg={msg}/>
                                <Form noValidate>
                                    <Row className="inputs">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Username"
                                            className="mb-3 label"
                                        >
                                            <Form.Control type="text" placeholder="Username"
                                                          name="username"
                                                          value={values.username}
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.username}
                                                          className="label"
                                            />

                                            <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                                {errors.username}
                                            </Form.Control.Feedback>

                                            {setUsername(values.username)}

                                        </FloatingLabel>
                                    </Row>

                                    <Row className="inputs">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3 label"
                                        >
                                            <Form.Control type="email" placeholder="name@example.com"
                                                          name="email"
                                                          value={values.email}
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.email}
                                                          className="label"
                                            />

                                            {
                                                !validator.isEmpty(values.email) &&
                                                !validator.isEmail(values.email) ? <p style={{
                                                    color: "#c7393d",
                                                    fontSize: "16px",
                                                    textAlign: "left",
                                                    marginTop: "10px"
                                                }}>It must be example@domain.com</p> : null
                                            }

                                            {setEmail(values.email)}

                                            <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                                {errors.email}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>
                                    </Row>


                                    <Row className="inputs">
                                        <ReCAPTCHA
                                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                            onChange={() => {
                                                setDone(false);
                                            }}
                                        />
                                    </Row>

                                    <Row className="inputs">

                                        <Button disabled={done || !(username.length !== 0 && email.length !== 0)}
                                                className="buttonSubmit"
                                                onClick={() => {
                                                    addUser();
                                                    setLoadButton(false);
                                                }}>

                                            Sign Up
                                            {loadButton ?
                                                null
                                                :
                                                <Spinner animation="border" size={"sm"}
                                                         style={{color: "#ffffff", marginLeft: "8%"}}/>
                                            }

                                        </Button>

                                    </Row>


                                    <Row>
                                        <p style={{fontSize: "20px", fontWeight: "bold"}}>OR</p>
                                        <Social/>
                                    </Row>
                                </Form>

                                <p>Already have an account?<Link to={'/login'} style={{
                                    textDecoration: "none",
                                    color: "#ed4e53"
                                }}> Login</Link></p>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Formik>
        </Container>
    );
}

export default SignUp;
