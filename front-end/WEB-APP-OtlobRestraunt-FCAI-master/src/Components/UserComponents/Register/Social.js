import '../../../index.css';
import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Navigate} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import api from "../../Apis/Base";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from "firebase/firestore";

let username = ""
let email = ""
let image = ""
const Social = () => {
    const [redirect, setRedirect] = useState(false);
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [token, setToken] = useState("");
    let [image, setImage] = useState("");

    const signUp = (res, type) => {
        if (type === "facebook" && res.email) {
            username = res.name;
            email = res.email;
            setToken(res.accessToken)
            image = res.picture.data.url
            addUser(username, email, image)
            localStorage.setItem("set_auth", true)


        }


        if (type === "google" && res.profileObj) {
            username = res.profileObj.name;
            email = res.profileObj.email;
            setToken(res.accessToken)
            image = res.profileObj.imageUrl
            addUser(username, email, image)
            localStorage.setItem("set_auth", true)

        }


        setRedirect(true);
    }

    const getToken = async (data, collection) => {

        const docSnap = await getDocs(collection);
        (docSnap).forEach(item => {
            if (item.data().email === email) {

                deleteDoc(doc(data, 'Tokens', item.id))
            }
        })


    }

    const addUser = (username, email, image) => {

        api.api.post("insecure/userDetails", {
            username: username,
            profileId: 2,
            email: email,
            social: true,
            img: image
        }).then((res) => {
            if (res.status === 201) {

                const data = getFirestore()
                const collection = collection(data, 'Tokens')

                getToken(data, collection).then(res => {
                    addDoc(collection, {
                        email: email,
                        token: res.data.token

                    })
                })

                setEmail("")
                setUsername("")
                localStorage.setItem("access_token", res.data.token)
                localStorage.setItem("user_email", email)
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    if (redirect) {
        return <Navigate to={"/"}/>
    }

    const responseFacebook = (response) => {
        signUp(response, 'facebook');
    }

    const responseGoogle = (response) => {
        signUp(response, 'google');
    }

    const googleLogout = (response) => {
        console.log(response);
    }

    return (
        <Container style={{height: "200px"}}>

            <Row style={{marginTop: "30px"}}>
                <FacebookLogin
                    appId="3184469661817036"
                    autoLoad={false}
                    fields="name,email,picture"
                    //onClick={componentClicked}
                    callback={responseFacebook}
                    icon="fa-facebook"

                />
            </Row>

            <Row style={{width: "50%", height: "50px", margin: "auto", marginTop: "20px"}}>
                <GoogleLogin
                    clientId="148396029595-rh29eiqo7m8c0tatvgefoa0rtsfdao4s.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}

                />
            </Row>


            {/*    <GoogleLogout*/}
            {/*  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"*/}
            {/*  buttonText="Logout"*/}
            {/*  onLogoutSuccess={googleLogout}*/}
            {/*>*/}
            {/*</GoogleLogout>*/}


        </Container>
    );
}

export default Social;
