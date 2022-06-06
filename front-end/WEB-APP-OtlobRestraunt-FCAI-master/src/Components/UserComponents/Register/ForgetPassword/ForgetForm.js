import React, {useEffect, useState} from "react";
import '../../../../index.css';
import {Button, Container, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";
import {Formik} from 'formik';
import {object, string} from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import {Navigate, useParams} from "react-router-dom";
import ToastMsg from "../../Toast";
import validator from "validator";
import api from "../../../Apis/Base";
import Load from "../../../Load";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from "firebase/firestore";

const schema = object({
    password: string().required(),
    confirmPassword: string().required(),
});

let show = false;

const ForgetForm = () => {
    let [hide, setHide] = useState(false);
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [done, setDone] = useState(true);
    let [wrong, setWrong] = useState(false);
    let [msg, setMsg] = useState("");
    let [loadButton, setLoadButton] = useState(true);
    let [wait, setWait] = useState(false);

    const {otp} = useParams();


    const getToken = async (data, collection) => {

        const docSnap = await getDocs(collection);
        (docSnap).forEach(item => {
            if (item.data().email === api.email) {

                deleteDoc(doc(data, 'Tokens', item.id))
            }
        })


    }

    const createPassword = () => {

        api.api.post("updatePassword", {
            email: api.email,
            password: password,
            otp: otp
        }).then((res) => {
            if (res.status === 200) {
                // const data = getFirestore()
                // const collection = collection(data, 'Tokens')
                //
                // getToken(data, collection).then(res => {
                //     addDoc(collection, {
                //         email: api.email,
                //         token: res.data.token
                //
                //     }).then(r =>
                //         setWait(true)
                //     );
                // })
                localStorage.setItem("access_token", res.data.token)

                localStorage.setItem("set_auth", true)
                getUser()
                setWait(true);


            } else
                return <Navigate to={'/resetPassword/'}/>

        }).catch((e) => {

            console.log(e.response.data.message)
            setWrong(true)
            setMsg(e.response.data.message)
            setLoadButton(true)
            return <Navigate to={'/resetPassword/'}/>
        })
    }

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

    useEffect(() => {



        api.api.post(`checkOtp`, {
            otp: otp
        }).then((res) => {
            if (res.status === 200) {
                show = true
                setDone(false)
            }

        }).catch((e) => {
            console.log(e)
        })

    }, [])


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
                    password: '',
                    confirmPassword: '',
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

                    <Container className="information">
                        <h2>Reset Your Password</h2>
                        {
                            show ?
                                <Form noValidate>
                                    {hide ?
                                        <ToastMsg show={hide} setShow={() => setHide(false)}
                                                  msg={"Password doesn't match"}/>
                                        : null
                                    }
                                    <Row className="inputs">

                                        <FloatingLabel controlId="floatingPassword" className="label"
                                                       label="Enter new Password">
                                            <Form.Control
                                                type="password" placeholder="Enter new Password"
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

                                            <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                                {errors.password}
                                            </Form.Control.Feedback>
                                            {setPassword(values.password)}
                                        </FloatingLabel>
                                    </Row>

                                    <Row className="inputs">

                                        <FloatingLabel controlId="floatingPassword" className="label"
                                                       label="Confirm Password">
                                            <Form.Control
                                                type="password" placeholder="Confirm Password"
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                isInvalid={!!errors.confirmPassword}
                                            />
                                            <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                            {
                                                values.password !== values.confirmPassword ?
                                                    <p style={{
                                                        color: "#c7393d",
                                                        fontSize: "16px",
                                                        textAlign: "left",
                                                        marginTop: "10px"
                                                    }}>
                                                        Password doesn't match !!
                                                    </p>
                                                    : null
                                            }
                                        </FloatingLabel>
                                    </Row>

                                    <Row className="inputs">
                                        <ReCAPTCHA
                                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                            onChange={() => {
                                                if (values.password === values.confirmPassword)
                                                    setDone(false)
                                                else {
                                                    setHide(true);
                                                }
                                            }}
                                        />
                                    </Row>

                                    <Row className="inputs">

                                        <Button disabled={done} className="buttons" onClick={() => {
                                            createPassword();
                                            setLoadButton(false);
                                        }}
                                        >
                                            Confirm

                                            {loadButton ?
                                                null
                                                :
                                                <Spinner animation="border" size={"sm"}
                                                         style={{color: "#ffffff", marginLeft: "8%"}}/>
                                            }
                                        </Button>


                                    </Row>

                                </Form>
                                :
                                <Load style={{width: "80px", height: "80px"}}/>
                        }
                    </Container>

                )}

            </Formik>
        </Container>
    );
}

export default ForgetForm;
