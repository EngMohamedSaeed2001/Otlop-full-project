import React, {useState} from "react";
import '../../../index.css';
import {Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner} from "react-bootstrap";
import {Formik} from 'formik';
import {object, string} from 'yup';
import {Link, Navigate} from "react-router-dom";


import Social from "./Social";
import validator from "validator";
import api from "../../Apis/Base";
import ToastMsg from "../Toast";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from "firebase/firestore";


const schema = object({

    email: string().required(),
    password: string().required(),
});


const Login = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [wait, setWait] = useState(false);
    let [wrong, setWrong] = useState(false);
    let [loadButton, setLoadButton] = useState(true);

    let [msg, setMsg] = useState("");


    const getUser = () => {
        api.apiToken.post("common/getUser", {
            email: api.email,

        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                if (res.data.profile.id === 3 || res.data.profile.id === 1) {
                    localStorage.setItem("is_admin", "true")
                    console.log("aa")
                }
            }

        }).catch((e) => {

            console.log(e.response.data.message)
        })
    }

    const getToken = async (data, collection) => {

        const docSnap = await getDocs(collection);
        (docSnap).forEach(item => {

            if (item.data().email === email) {
                deleteDoc(doc(data, 'Tokens', item.id))
            }
        })


    }

    const submit = () => {

        api.api.post("insecure/authenticate", {
            email: email,
            password: password,
            social: false

        }).then((res) => {
            if (res.status === 200) {

                const data = getFirestore()
                const collections = collection(data, 'Tokens')

                getToken(data, collections).then(re => {
                    addDoc(collections, {
                                        email: email,
                                        token: res.data.token

                                    }).then(r => {
                            setWait(true)
                        }
                    );
                })


                setEmail("")
                setPassword("")


                localStorage.setItem("access_token", res.data.token)
                localStorage.setItem("user_email", email)
                localStorage.setItem("set_auth", true)

                getUser()
                //setWait(true)
            }

        }).catch((e) => {

            console.log(e.response.data.message)
            setWrong(true)
            setMsg(e.response.data.message)
            setLoadButton(true)
        })
    }

    if (wait === true) {

        setTimeout(() => {
            setLoadButton(true)
        }, 1000)

        return <Navigate to={'/'}/>
    }


    return (
        <Container fluid>
            <Formik
                validationSchema={schema}
                onSubmit={console.log}
                initialValues={{
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
                                <h2 style={{marginTop: "50px", marginBottom: "30px", fontWeight: "bold"}}>Login</h2>
                                <ToastMsg show={wrong} setShow={() => setWrong(false)} msg={msg}/>
                                <Form noValidate>

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
                                        <FloatingLabel controlId="floatingPassword" className="label" label="Password">
                                            <Form.Control
                                                type="password" placeholder="Password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                            />

                                            {
                                                !validator.isEmpty(values.password) &&
                                                values.password.length <= 6 || values.password.length >= 18 ?
                                                    <p style={{
                                                        color: "#c7393d",
                                                        fontSize: "16px",
                                                        textAlign: "left",
                                                        marginTop: "10px"
                                                    }}>It must be greater than 6 and less than 18 </p> : null

                                            }
                                            {setPassword(values.password)}
                                            <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Row>

                                    <Row className="inputs">

                                        <Button disabled={!(email.length !== 0 && password.length !== 0)}
                                                className="buttonSubmit"
                                                onClick={() => {
                                                    submit();
                                                    setLoadButton(false);
                                                }}
                                        >

                                            Login
                                            {loadButton ?
                                                null
                                                :
                                                <Spinner animation="border" size={"sm"}
                                                         style={{color: "#ffffff", marginLeft: "8%"}}/>
                                            }

                                        </Button>

                                    </Row>

                                    <p><Link to={'/resetPassword'} style={{
                                        textDecoration: "none",
                                        color: "#ed4e53"
                                    }}> Forgot Password?</Link></p>


                                    <Row>
                                        <p style={{fontSize: "20px", fontWeight: "bold"}}>OR</p>
                                        <Social/>
                                    </Row>
                                </Form>

                                <p>Don't have an account?<Link to={'/signup'} style={{
                                    textDecoration: "none",
                                    color: "#ed4e53"
                                }}> Create one</Link></p>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Formik>
        </Container>
    );
}

export default Login;
