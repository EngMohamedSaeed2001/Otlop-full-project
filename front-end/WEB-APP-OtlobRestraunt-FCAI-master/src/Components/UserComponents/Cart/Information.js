import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, Container, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";
import {Formik} from 'formik';
import {bool, number, object, string} from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import {Navigate} from "react-router-dom";
import {createDefaultMaskGenerator, MaskedInput} from 'react-hook-mask';
import Api from "../../Apis/Base"

const maskGenerator = createDefaultMaskGenerator('+20 999 999 9999');

const schema = object({
    message: string(),
    phone: number().required(),
    address: string().required(),
    district: string().required(),
    terms: bool().required().oneOf([true], 'terms must be accepted'),
});

let city = [
    "Abo Tartour","Zayed", "Mohandeseen", "Agouza", "Boulak", "Ard elwa", "Imbaba", "Nasr", "El abour", "Zamalek", "Masr el gdeda", "Al sadat", "Badr", "Al haram", "Faysl",
]


let item = []
let p = false;
const Information = () => {

    let [load, setLoad] = useState(false);
    let [phone, setPhone] = useState("");
    let [address, setAddress] = useState("");
    let [districts, setDistricts] = useState("cairo");
    let [message, setMessage] = useState("");
    let [done, setDone] = useState(true);
    let [route, setRoute] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            Api.apiToken.get(`user/getCart/${Api.email}`).then((res) => {
                if (res.status === 200) {

                    Object.entries(res.data.orders).map(function (obj, _) {
                        item.push(obj[1].itemName)
                    })

                }
            }).catch((e) => {
                console.log(e)
            })

        }, 1000)
    }, [])


    const onSubmit = () => {
        Api.apiToken.post("user/orderCart", {
            userEmail: Api.email,
            phone: 0 + phone,
            address: districts + " - " + address + message,
            itemName: item

        }).then((res) => {
            if (res.status === 200) {
                setRoute(true)
                setLoad(true)
                setAddress("")
                setMessage("")
                setPhone("")
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    if (route === true) {
        console.log(load)
        setTimeout(() => {
            setLoad(false)
        }, 1000)

        return <Navigate to='/pay'/>
    }
    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={console.log}
                initialValues={{
                    phone: '',
                    address: '',
                    district: '',
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

                    <Container className="information">
                        <h2>Your Information</h2>
                        <Form noValidate onSubmit={onsubmit}>
                            <Row className="inputs">
                                <h6 style={{textAlign: "left", color: "grey"}}>Contact Details</h6>
                                <MaskedInput
                                    maskGenerator={maskGenerator}
                                    value={phone}
                                    onChange={setPhone}
                                    style={{width: "93%", padding: "15px"}}
                                    placeholder={"Mobile number"}

                                />

                                {
                                    phone.length !== 10 ? <p style={{
                                        color: "#c7393d",
                                        fontSize: "16px",
                                        textAlign: "left",
                                        marginTop: "10px"
                                    }}>It must be 11 number</p> : null
                                }
                            </Row>

                            <Row className="inputs">
                                <h6 style={{textAlign: "left", color: "grey"}}>Address Details</h6>
                                <Form.Select
                                    style={{width: "98%"}}
                                    value={districts}
                                    onChange={(e) => setDistricts(e.target.value)}
                                >
                                    <option>Select your district</option>
                                    {city.map(function (item, ind) {
                                        return (
                                            <option key={ind} value={item}>{item}</option>
                                        );

                                    })}
                                </Form.Select>
                            </Row>

                            <Row className="inputs">
                                <FloatingLabel controlId="floatingPassword" className="label" label="Address">
                                    <Form.Control
                                        type="text" placeholder="Address"
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback className="feedback" type="invalid" tooltip>
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                {setAddress(values.address)}
                            </Row>


                            <Row className="inputs">
                                <FloatingLabel className="label" controlId="floatingTextarea2"
                                               label="Additional Directions (Optional)">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ex: street, buildings,etc"
                                        style={{height: '100px'}}
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}

                                    />
                                </FloatingLabel>
                                {setMessage(values.message)}

                            </Row>

                            <Row className="inputs">
                                <ReCAPTCHA
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    onChange={() => setDone(false)}
                                />
                            </Row>

                            <Row className="inputs">

                                <Button disabled={done || !(phone.length === 10 && address.length !== 0)}
                                        className="buttonSubmit" onClick={() => onSubmit()}>
                                    Confirm
                                    {load ?
                                        <Spinner size="sm" animation="border"
                                                 style={{color: "#ffffff", marginLeft: "5%"}}/>
                                        : null
                                    }
                                </Button>

                            </Row>

                        </Form>
                    </Container>

                )}

            </Formik>

        </>
    );
}

export default Information;
