import React, {useState} from "react";
import '../../../index.css';
import {Button, Col, Container, FloatingLabel, Form, Image, InputGroup, Row, Spinner} from "react-bootstrap";
import {Formik} from 'formik';
import {object, string} from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import api from "../../Apis/Base";
import {Navigate} from "react-router-dom";
import ToastMsg from "../../UserComponents/Toast";


const schema = object({

    email: string().required(),
    username: string().required(),
});


const AddUser = () => {
    let [type, setType] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [done, setDone] = useState(true);
    let [loadButton, setLoadButton] = useState(true);
    let [wait, setWait] = useState(false);
    let [wrong, setWrong] = useState(false);
    let [msg, setMsg] = useState("");

    const addUser = () => {

        console.log(type)
        api.apiToken.post("admin/addUser", {
            username: username,
            profileId: parseInt(type),
            email: email,
            social: false
        }).then((res) => {
            if (res.status === 200) {
                setWait(true);

                setEmail("")

                setUsername("")
                setDone(false)
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
        return <Navigate to={'/admin'}/>
    }

    return (
        <Container fluid>
            <Formik
                validationSchema={schema}
                onSubmit={console.log}
                initialValues={{
                    username: "",
                    email: '',
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
                                <h2 style={{marginTop: "50px", marginBottom: "30px", fontWeight: "bold"}}>Add User</h2>

                                <ToastMsg show={wrong} setShow={() => setWrong(false)} msg={msg}/>

                                <Form noValidate>

                                    <Row>

                                            <Form.Select
                                                style={{width: "86%",marginLeft:"6%"}}
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            >
                                                <option value="0">Select type of user</option>
                                                <option value="1">Admin</option>
                                                <option value="2">User</option>
                                                <option value="3">Super Admin</option>

                                            </Form.Select>


                                    </Row>
                                    <br></br>

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

                                            <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                                {errors.email}
                                            </Form.Control.Feedback>
                                            {setEmail(values.email)}

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

                                            Add

                                            {loadButton ?
                                                null
                                                :
                                                <Spinner animation="border" size={"sm"}
                                                         style={{color: "#ffffff", marginLeft: "8%"}}/>
                                            }

                                        </Button>
                                    </Row>

                                </Form>

                            </Col>
                        </Row>
                    </Container>
                )}
            </Formik>
        </Container>
    );
}

export default AddUser;
