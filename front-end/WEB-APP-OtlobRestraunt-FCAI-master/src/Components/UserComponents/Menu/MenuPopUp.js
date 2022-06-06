import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Api from "../../Apis/Base";
import Load from "../../Load";


let cat = [];
let item = [];

const MenuPopUp = (props) => {
    let [load, setLoad] = useState(false);

    useEffect(() => {
        // let canc = false;
        setTimeout(() => {
            //  if (!canc) {
            Api.api.get("getAllCategory").then((res) => {
                if (res.status === 200) {

                    Object.entries(res.data).map(function (obj1, ind) {
                        cat.push(obj1[1]);
                        item.push(obj1[1].items[0])
                    })
                    setLoad(true)

                }

                console.log(item.itemName)
            }).catch((e) => {
                console.log(e)
            })
            //   }
        }, 1000)

        // return () => {
        //     canc = true;
        // }


    }, [])
    return (
        <>
            {props.show ? (
                <Container className="menu-popUp" onMouseLeave={props.setShow}>
                    <Row xs={3} style={{padding: "20px"}}>
                        <Col>
                            <Row><h5>Make your order</h5></Row>
                            <Row style={{textAlign: "justify"}}>
                                <p>Contrary to popular belief,
                                    Lorem Ipsum is not simply random text.
                                    It has roots in a piece of classical Latin literature from 45 BC,
                                    making it over 2000 years old</p>
                            </Row>

                            <Row>
                                <Link to='/menu'>
                                    <Button className="menu-button">Check our menu</Button>
                                </Link>
                            </Row>

                        </Col>


                        {
                            load ?
                                <Col>
                                    <Row><h5>Menu</h5></Row>
                                    {cat.map(function (cat, _) {
                                        return (
                                            <Row id={cat.id}><Link to={`/menu/${cat.categoryName}`}
                                                                   className="footer-list">{cat.categoryName}</Link></Row>
                                        );
                                    })
                                    }

                                </Col>
                                :
                                <Load style={{width: "80px", height: "80px"}}/>
                        }

                        <Col xs={3}>
                            <Row><h5>Menu Item</h5></Row>
                            {
                                load ?
                                    item.map(function (item2, _) {
                                        return (
                                            <Row>
                                                <Link to={`/item/${item2.itemName}`}
                                                      className="footer-list">{item2.itemName}</Link></Row>
                                        );
                                    })
                                    :
                                    <Load style={{width: "80px", height: "80px"}}/>


                            }
                        </Col>


                    </Row>

                    {/*<Row style={{marginTop: "40px"}}>*/}
                    {/*    {cat.map(function (item, ind) {*/}
                    {/*        return (*/}
                    {/*            <Col key={item.id} style={{marginLeft: "30px"}}>*/}
                    {/*                <Link to={`/item/${item.items[0].itemName}`}>*/}
                    {/*                    <Image className="itemImage" roundedCircle={true} src={item.items[0].img}/>*/}
                    {/*                </Link>*/}
                    {/*                <Row><Link to={`/item/${item.items[0].itemName}`}*/}
                    {/*                           className="itemName">{item.items[0].itemName}</Link></Row>*/}
                    {/*                <Row><p className="itemPrice">$ {item.items[0].price}</p></Row>*/}
                    {/*            </Col>*/}
                    {/*        );*/}
                    {/*    })*/}
                    {/*    }*/}
                    {/*</Row>*/}
                </Container>
            ) : null
            }
        </>
    );
}

export default MenuPopUp;
