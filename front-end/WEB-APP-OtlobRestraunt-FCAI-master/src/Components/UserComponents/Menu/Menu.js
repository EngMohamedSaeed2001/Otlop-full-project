import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Button, Card, CloseButton, Col, Container, Image, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {BsBag, BsPencil} from "react-icons/bs";
import Api from "../../Apis/Base";
import Load from "../../Load";


let cat = [];
let item = [];
const Menu = () => {
    const {name} = useParams();
    let [load, setLoad] = useState(false);
    let [click, setClick] = useState(false);

    const getAll = () => {
        let canc2 = false;
        item = []
        if (!canc2) {
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

        return () => {
            canc2 = true;
        }
    }

    const getOne = (namep) => {
        item = [];
        let canc = false;
        if (!canc) {
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
         return () => {
            canc = true;
        }
    }

    const getAllCat = () => {
        cat = []
            Api.api.get("getAllCategory").then((res) => {
                if (res.status === 200) {

                    cat=res.data;
                    console.log(cat)
                    setLoad(true)
                }
            }).catch((e) => console.log(e));
    }

    useEffect(() => {
let canc = false;
        if (!canc) {
            setTimeout(() => {

                getAllCat()
               // getAll()
                if (name === "all") {
                   // getAllCat()
                    getAll()
                } else {

                    getOne(name)
                }


            }, 1000)
        }
         return () => {
            canc = true;
        }




    }, [])

    const deleteCat = (names) => {
        Api.apiToken.delete(`admin/deleteCategory/${names}`).then((res) => {
            if (res.status === 200) {
                console.log("ok")
                //getAllCat()

                let updateCat = []
                updateCat = cat.filter(data => data.categoryName !== name)
                cat = []
                cat = updateCat
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const deleteItem = (names) => {
        Api.apiToken.delete(`admin/deleteItem/${names}`).then((res) => {
            if (res.status === 200) {
                console.log("ok")
                // getAll()

                let update = []
                update = item.filter(data => data.itemName !== name)
                item = []
                item = update

            }
        }).catch((e) => {
            console.log(e)
        })
    }

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
                                       getAll()
                                   }}
                            />
                        </Link>
                        <Row style={{marginTop: "5px"}}><Link to="/menu/all" style={{
                            textDecoration: "none",
                            color: "#fff",
                            fontWeight: "bold"
                        }}>All</Link></Row>
                    </Col>

                    {

                        cat.map(function (cat, ind) {
                        return (
                            <Col key={ind}>
                                <Link to={`/menu/${cat.categoryName}`}>
                                    <Image className="actives" roundedCircle={true} src={cat.categoryPhoto}
                                           width="100px"
                                           height="100px" onClick={() => {
                                        setLoad(false);
                                        getOne(cat.categoryName)
                                    }}/>
                                </Link>

                                {
                                    Api.admin === 'true' ?
                                        <>
                                            <Link to={`/updateCategory/${cat.categoryName}`}>
                                                <BsPencil style={{marginRight: '8px'}}/>
                                            </Link>

                                            <CloseButton
                                                onClick={() => deleteCat(cat.categoryName)}
                                                aria-label="Hide"/>
                                        </>
                                        :
                                        null
                                }

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
                            item.map(function (item, ind) {
                                return (
                                    <Col style={{margin: "auto"}} key={item.id}>
                                        <Card style={{width: '23rem'}} className="cards">
                                            <Link to={`/item/${item.itemName}`}>
                                                <Card.Img className="card-image" variant="top" src={item.img}/>
                                            </Link>
                                            <Card.Body>
                                                {
                                                    Api.admin === 'true' ?
                                                        <>
                                                            <Link to={`/updateItem/${item.itemName}`}>
                                                                <BsPencil style={{marginRight: '8px'}}/>
                                                            </Link>

                                                            <CloseButton
                                                                onClick={() => deleteItem(item.itemName)}
                                                                aria-label="Hide"/>
                                                        </>
                                                        :
                                                        null
                                                }

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

                </Row>
            </Container>

        </>

    );
}

export default Menu;
