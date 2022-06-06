import React, {useState} from "react";
import '../../index.css';
import {Button, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {Formik} from 'formik';
import {bool, object, string} from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import {Rating} from 'react-simple-star-rating'
import {Navigate} from "react-router-dom";
import ToastMsg from "./Toast";
import validator from 'validator'
import Api from "../Apis/Base";

const schema = object({

    email: string().required(),
    message: string(),
    terms: bool().required().oneOf([true], 'terms must be accepted'),
});

const tooltipArray = [
    'Terrible',
    'Terrible+',
    'Bad',
    'Bad+',
    'Average',
    'Average+',
    'Great',
    'Great+',
    'Awesome',
    'Awesome+'
]
const fillColorArray = [
    '#f17a45',
    '#f17a45',
    '#f19745',
    '#f19745',
    '#f1a545',
    '#f1a545',
    '#f1b345',
    '#f1b345',
    '#f1d045',
    '#f1d045'
]

const Opinion = () => {
    let [email, setEmail] = useState("");

    let [message, setMessage] = useState("");
    let [done, setDone] = useState(true);
    let [input, setInput] = useState(true);
    let [hide, setHide] = useState(false);


    const [rating1, setRating1] = useState(0)
    let [load, setLoad] = useState(false);

    const handleRating1 = (rate) => setRating1(rate)

    const change = (email, val) => {
        setEmail(email)
        setInput(val)
    }

    const sendOpinion = () => {
        Api.apiToken.post("/user/addOpinion", {
                rate: (rating1 / 10) / 2,
                userEmail: email,
                opinion: message
            }
        ).then((res) => {
            if (res.status === 200) {
                setLoad(true)
                setHide(true);
            }


        }).catch((e) => {
            console.log(e)
        })
    }

    const onsubmit = () => {

        sendOpinion();
        setMessage("");
        setEmail("");
        setRating1(0);
    }
    if (load === true && hide === false) {
        return <Navigate to='/'/>
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                email: '',

                message: '',
                terms: false,
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

                <Container className="opinion">
                    <h2>Rate Us</h2>
                    <Form noValidate>
                        <ToastMsg show={hide} setShow={() => setHide(false)} msg={"Thanks for your opinion"}/>
                        <Row className="inputs">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3 label"
                            >
                                <Form.Control type={"email"} placeholder="name@example.com"
                                              name="email"
                                              value={values.email}
                                              onChange={handleChange}
                                              isInvalid={!!errors.email}
                                              className="label"
                                />

                                {
                                    !validator.isEmail(values.email) ? <p style={{
                                        color: "#c7393d",
                                        fontSize: "16px",
                                        textAlign: "left",
                                        marginTop: "10px"
                                    }}>It must be example@domain.com</p> : change(values.email, false)
                                }
                                <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                    {errors.email}
                                </Form.Control.Feedback>

                            </FloatingLabel>
                        </Row>


                        <Row className="inputs">
                            <FloatingLabel className="label" controlId="floatingTextarea2" label="Comments (Optional)">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{height: '100px'}}

                                    name="message"
                                    value={values.message}
                                    onChange={handleChange}

                                />
                                {setMessage(values.message)}

                            </FloatingLabel>

                        </Row>

                        <Row className="inputs">
                            <Rating
                                onClick={handleRating1}
                                ratingValue={rating1}
                                size={50}
                                transition
                                allowHalfIcon
                                showTooltip
                                tooltipArray={tooltipArray}
                                fillColorArray={fillColorArray}
                            />
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
                            <Button disabled={input || done} className="buttonSubmit" onClick={() => onsubmit()}>
                                Send
                            </Button>
                        </Row>

                    </Form>
                </Container>
            )}
        </Formik>
    );
}

export default Opinion;
