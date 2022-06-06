import React, {useEffect, useState} from "react";
import '../../index.css';
import {Button, Col, Container, Image, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {BsBag, BsFillTelephoneFill, BsSearch} from "react-icons/bs";
import Searcher from "./Search";
import Cart from "./Cart/Cart";
import Alerts from "../Alerts";
import api from "../Apis/Base";
import {Link} from "react-router-dom";
import Api from "../Apis/Base";




const Navs = (props) => {
    let [cancel, setCancel] = useState(false);
    let [items, setItem] = useState(0);
    let [cart, setCart] = useState(false);
    let [show, setShow] = useState(false);
    let [alert, setAlert] = useState(false);
    let [admin, setAdmin] = useState(true);
    let [login, setLogin] = useState(true);

    const get = () => {
      Api.apiToken.get(`user/getCart/${Api.email}`).then((res) => {
                if (res.status === 200) {
                    setItem(res.data.orders.length)

                }
            }).catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            get()

        }, 1000)


    }, [])

    return (
        <>
            <Searcher cancel={cancel} hide={() => setCancel(false)}/>
            <Container fluid style={{fontSize: "18px"}}>
                <Row>
                    <Navbar bg="dark" style={{width: "100%"}}>
                        <Container fluid>
                            <Nav style={{color: "white", fontSize: "15px", marginTop: "10px"}}>
                                <Row xs={"auto"}>
                                    <Col style={{marginRight: "5px"}}>
                                        <BsFillTelephoneFill/>
                                    </Col>
                                    <Col>
                                        <p>+02123456789</p>
                                    </Col>
                                </Row>
                            </Nav>
                            <Nav>
                                <Row xs={"auto"}>
                                    {api.auth === 'false' ?
                                        <Col>
                                            <Link to='/signUp'>
                                                <Button variant="outline-primary">Register</Button>{' '}
                                            </Link>
                                        </Col>
                                        :

                                        <Col>
                                            <Button variant="outline-danger"
                                                    onClick={() => {
                                                        localStorage.setItem("set_auth", false)
                                                        localStorage.setItem("is_admin", false)
                                                        setAlert(true);
                                                    }}
                                            >Logout</Button>{' '}
                                        </Col>

                                    }

                                </Row>
                            </Nav>

                        </Container>
                    </Navbar>
                </Row>

                <Row>
                    <Navbar style={{background: "transparent"}} collapseOnSelect expand="lg">
                        <Container fluid>
                            <Alerts show={alert} setShow={() => {
                                setAlert(false);
                                window.location.reload()
                            }} link={"/"}
                                    msg={"Do you want logout?"}/>
                            <Navbar.Brand href="/">
                                <img src="http://androthemes.com/themes/react/slices/assets/img/logo.png"/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto" id="navs">
                                    {api.admin === 'true' ? (
                                            <>
                                                <Nav.Link href="/admin" id="navs1">Admin</Nav.Link>
                                                <NavDropdown title="Admin Pages" id="basic-nav-dropdown">
                                                    <NavDropdown.Item href="/addCategory">Add Category</NavDropdown.Item>

                                                    <NavDropdown.Item href="/addItem">Add Item</NavDropdown.Item>
                                                    <NavDropdown.Divider/>
                                                    <NavDropdown.Item href="/admin">All Users</NavDropdown.Item>
                                                    <NavDropdown.Item href="/adminCategory">All
                                                        Categories</NavDropdown.Item>
                                                    <NavDropdown.Item href="/adminOrder">All Orders</NavDropdown.Item>
                                                    <NavDropdown.Item href="/adminOpinions">All User's
                                                        Opinions</NavDropdown.Item>
                                                    <NavDropdown.Item href="/adminContact">All Contact</NavDropdown.Item>

                                                </NavDropdown>
                                            </>
                                        )

                                        : null}
                                    <Nav.Link href="/" id="navs1">Home</Nav.Link>
                                    <Nav.Link href="/location" id="navs1">Locations</Nav.Link>
                                    <Nav.Link href="/contact" id="navs2">Contact Us</Nav.Link>
                                    {/*<Nav.Link href="" id="navs3" onMouseOver={() => setShow(true)}>Menu</Nav.Link>*/}
                                </Nav>

                                <Nav.Link style={{marginTop: "10px"}}>
                                    <Container className="position-relative">
                                        <BsBag className="cartIcon" onClick={() => setCart(true)}/>
                                        <Container
                                            className="position-absolute top-0 start-100 translate-middle p-2 rounded-circle">
                                            <p id="bubble">
                                                {items}
                                            </p>
                                        </Container>
                                    </Container>

                                </Nav.Link>

                                <Nav.Link>
                                    <BsSearch className="cartIcon" onClick={() => setCancel(true)}/>
                                </Nav.Link>

                                <Nav.Link href='/userProfile'>
                                    <Image roundedCircle width={30}
                                           src={"https://mpng.subpng.com/20180720/ivv/kisspng-computer-icons-user-profile-avatar-job-icon-5b521c567f49d7.5742234415321078625214.jpg"}/>
                                </Nav.Link>

                                <div style={{display: "none"}}><Searcher cancel={cancel}/></div>

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </Row>

            </Container>
            {/*<MenuPopUp show={show} setShow={() => setShow(false)}/>*/}

            {cart ? <Cart show={cart} setShow={() => setCart(false)}/> : null}

        </>


    );
}

export default Navs;
