import React, {useEffect} from "react";
import '../../App.css';
import {Col, Container, Row} from "react-bootstrap";
import {BsFacebook, BsFillArrowUpSquareFill, BsGithub, BsGoogle} from "react-icons/bs";
import {Link} from "react-router-dom";
import Api from "../Apis/Base";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};


let cat = [];
let item = [];

const Footer = (props) => {
    useEffect(() => {
        let canc = false;
        setTimeout(() => {

            if (!canc) {
                Api.api.get("getAllCategory").then((res) => {
                    if (res.status === 200) {
                        Object.entries(res.data).map(function (obj1, ind) {
                            cat.push(obj1[1]);
                            Object.entries(obj1[1].items).map(function (obj, ind1) {
                                item.push(obj[1]);
                            })
                        })

                    }
                }).catch((e) => {
                    console.log(e)
                })
            }

        }, 1000)

        return () => {
            canc = true;
        }

    }, [])

    return (

        <Container fluid className="footer">

            <Row style={{marginBottom: "50px"}}>
                <Row xs={3} style={{marginBottom: "30px", marginTop: "30px"}}>
                    <h4>
                        <img src="http://androthemes.com/themes/react/slices/assets/img/logo-light.png"/>
                    </h4>
                </Row>

                <Row>
                    <Col xs={4}>
                        <Row><h5>Information</h5></Row>
                        <Row><Link to="/" className="footer-list">Home</Link></Row>
                        <Row><Link to="/menu/all" className="footer-list">Menu</Link></Row>
                        <Row><Link to="/contact" className="footer-list">Contact Us</Link></Row>

                    </Col>

                    <Col xs={3}>
                        <Row><h5> Top items</h5></Row>
                        {cat.map(function (obj, ind) {
                            return (
                                <Row id={obj.id}>
                                    <Link to={`/menu/${obj.categoryName}`}
                                          className="footer-list">{obj.categoryName}</Link>
                                </Row>
                            )
                        })}

                    </Col>

                    <Col xs={3}>
                        <Row><h5>Others</h5></Row>
                        <Row><p className="footer-list">Privacy Policy</p></Row>
                        <Row><p className="footer-list">Cookie Policy</p></Row>
                        <Row><p className="footer-list">Terms & Conditions</p></Row>
                        <Row><Link to="/rate" className="footer-list">Rate Us</Link></Row>
                    </Col>

                    <Col style={{fontSize: "18px"}} xs={2}>
                        <Row xs={1}>
                            <Row><h5>Social Media</h5></Row>
                            <Col>
                                <a target="_blank" href="/">
                                    <BsFacebook/>
                                </a>
                            </Col>

                            <Col>
                                <a target="_blank" href="/">
                                    <BsGoogle/>
                                </a>
                            </Col>

                            <Col>
                                <a target="_blank"
                                   href="https://github.com/EngMohamedSaeed2001/WEB-APP-OtlobRestraunt-FCAI">
                                    <BsGithub/>
                                </a>
                            </Col>
                        </Row>

                    </Col>

                </Row>
            </Row>

            <hr/>

            <Row style={{marginTop: "30px"}}>
                <Col style={{marginBottom: "35px"}}>
                    <p>Copyright &copy; 2021 <span className="logoColor">Slices</span> All Rights Reserved.</p>
                </Col>

                <Col></Col>

                <Col xs={3}>
                    <BsFillArrowUpSquareFill onClick={() => {
                        scrollToTop()
                    }} className="footerIcon"/>
                </Col>
            </Row>


        </Container>

    );
}

export default Footer;
