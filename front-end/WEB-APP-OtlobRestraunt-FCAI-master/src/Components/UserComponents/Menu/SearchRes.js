import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {BsBag} from "react-icons/bs";
import Api from "../../Apis/Base";
import Load from "../../Load";


let cat = [];
let item = [];
let itemSearch = []
let found = false
const SearchRes = () => {
    const {name} = useParams();
    let [load, setLoad] = useState(false);

    const getAll = (name) => {
        Api.api.get("getAllCategory").then((res) => {
            if (res.status === 200) {
                Object.entries(res.data).map(function (obj1, ind) {
                    Object.entries(obj1[1].items).map(function (obj, ind1) {
                        item.push(obj[1]);
                    })
                })
                console.log(item)
                setLoad(true);
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const getOne = (namep) => {

        Api.apiToken.get(`common/getCategory/${namep}`).then((res) => {
            if (res.status === 200) {
                Object.entries(res.data.items).map(function (obj, ind1) {
                    item.push(obj[1]);
                })

                setLoad(true)

            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const search = () => {
        let canc3 = false;

        if (!canc3) {
            Api.apiToken.get(`user/search/${name}`).then((res) => {
                if (res.status === 200) {

                    itemSearch=res.data;

                    if (itemSearch.length === 0) {
                        setLoad(true)

                        found = false
                    } else {
                        setLoad(true)
                        found = true
                    }

                } else {
                    found = false
                }
            }).catch((e) => {
                console.log(e)
                found = false
            })
        }
 return () => {
            canc3 = true;
        }
    }

    useEffect(() => {
        let canc2 = false;

        if (!canc2) {
            setTimeout(() => {
                Api.api.get("getAllCategory").then((res) => {
                    if (res.status === 200) {
                        cat=res.data

                    }
                }).catch((e) => console.log(e));

                search();

            }, 1000)
        }

        return () => {
            canc2 = true;
        }
    }, [])

    return (
        <>
            <Container fluid className="header-menu">
                <Col xs={3}><h1 style={{paddingTop: "300px"}}>Menu</h1></Col>
            </Container>

            <Container fluid className="nav-menu">
                <Row>
                    <Col>
                        <Link to={`/menu/all`}>
                            <Image className="nav-MenuImage" roundedCircle={true}
                                   src="http://androthemes.com/themes/react/slices/assets/img/prods-sm/2.png"
                                   width="100px" height="100px"
                                   onClick={() => {
                                       setLoad(false)
                                   }}
                            />
                        </Link>
                        <Row style={{marginTop: "5px"}}><Link to="/menu/all" style={{
                            textDecoration: "none",
                            color: "#fff",
                            fontWeight: "bold"
                        }}>All</Link></Row>
                    </Col>

                    {cat.map(function (cat, ind) {
                        return (
                            <Col key={ind}>
                                <Link to={`/menu/${cat.categoryName}`}>
                                    <Image className="actives" roundedCircle={true} src={cat.categoryPhoto}
                                           width="100px"
                                           height="100px" onClick={() => {
                                        setLoad(false);
                                    }}/>
                                </Link>

                                <Row style={{marginTop: "5px"}}><Link to={`/menu/${cat.categoryName}`} style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                    fontWeight: "bold"
                                }}>{cat.categoryName}</Link></Row>
                            </Col>
                        );
                    })
                    }
                </Row>

            </Container>


            <Container fluid style={{marginTop: "80px"}}>
                <Row xs={"auto"}>
                    {
                        load ?
                            itemSearch.map(function (item, ind) {
                                return (
                                    <Col style={{margin: "auto"}} key={item.id}>
                                        <Card style={{width: '23rem'}} className="cards">
                                            <Link to={`/item/${item.itemName}`}>
                                                <Card.Img className="card-image" variant="top" src={item.img}/>
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className="card-name">{item.itemName}</Card.Title>
                                                <Card.Text className="card-desc">{item.des}</Card.Text>
                                            </Card.Body>

                                            <Card.Body>
                                                <Card.Footer style={{background: "none"}}>
                                                    <Row xs={2}>
                                                        <Col style={{marginTop: "15px"}}>
                                                            <p style={{fontWeight: "bold"}}>{item.price}$</p>
                                                        </Col>

                                                        <Col>
                                                            <Card.Link href={`/item/${item.itemName}`}>
                                                                <Button className="card-button">
                                                                    Order <BsBag className="buttonIcon"/>
                                                                </Button>{''}
                                                            </Card.Link>
                                                        </Col>
                                                    </Row>
                                                </Card.Footer>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                            :
                            <Load style={{width: "80px", height: "80px"}}/>

                    }

                    {
                        found === false ?
                            <Container>
                                <Container className="searcher-container">
                                    <span>OOPS !!</span>
                                    <br/>
                                    <span>Item</span>
                                    <br/>
                                    <span>Not</span>
                                    <br/>
                                    <span>Found </span>
                                </Container>

                            </Container>
                            :
                            null
                    }

                </Row>
            </Container>

        </>

    );
}

export default SearchRes;
