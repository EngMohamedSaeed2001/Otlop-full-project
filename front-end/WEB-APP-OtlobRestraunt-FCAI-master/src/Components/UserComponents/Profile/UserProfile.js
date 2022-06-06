import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner} from "react-bootstrap";
import {Formik} from 'formik';
import {bool, number, object, string} from 'yup';
import {FcOldTimeCamera} from "react-icons/fc";
import api from "../../Apis/Base";
import validator from "validator";
import {createDefaultMaskGenerator, MaskedInput} from 'react-hook-mask';
import {storage} from "../../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Load from "../../Load";


const maskGenerator = createDefaultMaskGenerator('+20 999 999 9999');

const schema = object({
    username: string(),
    email: string(),
    phone: number(),
    terms: bool().required().oneOf([true], 'terms must be accepted'),
});

let url = "";
let oldEmail = `${localStorage.getItem("user_email")}`;

const UserProfile = (props) => {
    let [image, setImage] = useState("https://mpng.subpng.com/20180720/ivv/kisspng-computer-icons-user-profile-avatar-job-icon-5b521c567f49d7.5742234415321078625214.jpg");
    let [file, setFile] = useState(null);
    let [load, setLoad] = useState(false)

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [phone1, setPhone1] = useState("");
    let [loadButton, setLoadButton] = useState(true);
    let [wait, setWait] = useState(false);

    const imageChange = (e) => {
        const img = e.target.files[0];
        setImage(URL.createObjectURL(img));
        setFile(img)


        if (!img) return

        uploadImage(img)
    }

    function uploadImage(file) {

        let storageRef = ref(storage, `usersImages/${username}`);

        let uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    url = downloadURL;
                    setImage(url)

                });
            }
        );


        setFile(null);
    }

    const getProfile = () => {
        api.apiToken.post("common/getUser", {
            email: oldEmail
        }).then((res) => {
            if (res.status === 200) {

                setLoad(true)
                setEmail(res.data.email)
                setPhone(res.data.phone)
                setUsername(res.data.username)

                if (res.data.img !== null) {
                    url = res.data.img
                }
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const updateProfile = () => {

        api.apiToken.patch("insecure/userDetails/updateUser", {
            username: username,
            phone: 0 + phone1,
            oldEmail: email.length === 0 ? api.email : email,
            img: image
        }).then((res) => {
            if (res.status === 200) {
                setWait(true)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        let canc = false;
        if (!canc) {
            setTimeout(() => {

                getProfile()

            }, 1000)
        }
        return () => {
            canc = true;
        }

    })


    if (wait === true) {

        setTimeout(() => {
            setLoadButton(true)
        }, 1000)
    }

    return (
        <Container fluid style={{backgroundColor: "#f1f2f4"}}>
            <Formik
                validationSchema={schema}
                onSubmit={console.log}
                initialValues={{
                    username: '',
                    email: '',
                    phone: '',
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

                    load ?
                        (
                            <Container fluid style={{marginTop: "30px", padding: "30px"}}>
                                <h3 style={{textAlign: "left", color: "#3D5170", margin: "30px"}}>User Profile</h3>
                                <Row>
                                    <Col className="profile1">
                                        <Container>
                                            <Image width={"110px"} roundedCircle
                                                   src={url === "" ? image : url}/>

                                            <p style={{marginLeft: "18%", marginTop: "-5%"}}>
                                                <input accept="image/*" id="icon-button-file" onChange={imageChange}
                                                       type="file" style={{display: 'none'}}/>
                                                <label htmlFor="icon-button-file">
                                                    <FcOldTimeCamera cursor="pointer" size={30}/>
                                                </label>
                                            </p>

                                            <h5 style={{marginTop: "30px", color: "#3D5170"}}>{username}</h5>
                                            <h6 style={{textAlign: "left", margin: "20px"}}>Email: {email}</h6>
                                            <h6 style={{textAlign: "left", margin: "20px"}}>Phone: {phone}</h6>
                                        </Container>
                                    </Col>

                                    <Col className="profile">
                                        <Container>
                                            <h4 style={{textAlign: "left", color: "#3D5170"}}>Account Details</h4>

                                            <Form noValidate onSubmit={onsubmit}>
                                                <Row className="inputs">
                                                    <FloatingLabel controlId="floatingUsername" className="label"
                                                                   label="Username">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Username"
                                                            aria-describedby="inputGroupPrepend"
                                                            name="username"
                                                            value={values.username}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.username}
                                                        />
                                                        <Form.Control.Feedback type="invalid" tooltip>
                                                            {errors.username}
                                                        </Form.Control.Feedback>
                                                        {setUsername(values.username)}
                                                    </FloatingLabel>

                                                </Row>

                                                <Row className="inputs">
                                                    <h6 style={{textAlign: "left", color: "grey"}}>Contact Details</h6>
                                                    <FloatingLabel controlId="floatingEmail" className="label"
                                                                   label="Email">
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Email"
                                                            aria-describedby="inputGroupPrepend"
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.email}
                                                        />
                                                        {
                                                            !validator.isEmpty(values.email) &&
                                                            !validator.isEmail(values.email) ? <p style={{
                                                                color: "#c7393d",
                                                                fontSize: "16px",
                                                                textAlign: "left",
                                                                marginTop: "10px"
                                                            }}>It must be
                                                                example@domain.com</p> : setEmail(values.email)
                                                        }

                                                        <Form.Control.Feedback type="invalid" tooltip>
                                                            {errors.email}
                                                        </Form.Control.Feedback>
                                                    </FloatingLabel>

                                                </Row>

                                                <Row className="inputs">
                                                    {/*<FloatingLabel controlId="floatingPassword" className="label"*/}
                                                    {/*               label="Mobile number">*/}


                                                    <MaskedInput
                                                        maskGenerator={maskGenerator}
                                                        value={phone1}
                                                        onChange={setPhone1}
                                                        style={{width: "93%", padding: "15px"}}
                                                        placeholder={"Mobile number"}

                                                    />

                                                    {console.log(phone1.length)}

                                                    {
                                                        phone1.length !== 10 ? <p style={{
                                                            color: "#c7393d",
                                                            fontSize: "16px",
                                                            textAlign: "left",
                                                            marginTop: "30px"
                                                        }}>It must be 11 number</p> : null

                                                    }

                                                    {/*{*/}
                                                    {/*    phone1.length === 10 ? setPhone1('0' + phone1) : null*/}
                                                    {/*}*/}

                                                </Row>

                                                <Row className="inputs">
                                                    <Button className="buttonSubmit" onClick={() => {
                                                        updateProfile();
                                                        setLoadButton(false);
                                                    }}>
                                                        Update Account

                                                        {loadButton ?
                                                            null
                                                            :
                                                            <Spinner animation="border" size={"sm"}
                                                                     style={{color: "#ffffff", marginLeft: "8%"}}/>
                                                        }
                                                    </Button>
                                                </Row>

                                            </Form>
                                        </Container>
                                    </Col>

                                </Row>
                            </Container>
                        )
                        :

                        <Load style={{width: "80px", height: "80px"}}/>

                )}
            </Formik>
        </Container>
    )
}

export default UserProfile;