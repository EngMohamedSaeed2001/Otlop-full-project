import {CloseButton, Col, Image, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import '../../../index.css';
import Api from "../../Apis/Base"
import Load from "../../Load";

let total = 0;
let items = []

const CartContent = (props) => {

    let [del, setDel] = useState(false);
    let [load, setLoad] = useState(false)
    let [price, setPrice] = useState(0)

    const getSize = (size) => {
        if (size === 1) {
            return "Small"
        } else if (size === 2) {
            return "Medium"
        } else if (size === 3) {
            return "Large"
        }
    }

    const getTotal = (q, p) => {
        return (parseInt(q) * parseInt(p));
    }


    const getCart = () => {
        Api.apiToken.get(`user/getCart/${Api.email}`).then((res) => {
            if (res.status === 200) {
                Object.entries(res.data.orders).map(function (obj, _) {
                    items.push(obj[1])

                })
                setLoad(true)
            }
        }).catch((e) => {
            console.log(e)
        })

    }

    useEffect(() => {
        let canc = false;
        setTimeout(() => {
            if (!canc) {
                getCart()
            }
        }, 1000)

        return () => {
            canc = true;
        }
    }, [])

    const deleteItem = async (name, price) => {
        Api.apiToken.post("user/deleteItem", {
            email: Api.email,
            itemName: name
        }).then((res) => {
            if (res.status === 200) {
                console.log("ok")
                let update = []
                update = items.filter(data => data.itemName !== name)
                items = []
                items = update
                setDel(true)
                //window.location.reload()


            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const getPrice = () => {
        let price = 0;
        items.map(function (it, _) {
            price += parseInt((it.price * it.quantity))
        })
        return (price);
    }
    return (
        <>
            <Table borderless responsive style={{marginTop: "20px", width: "100%"}}>
                <tbody>
                {load ?
                    items.map(function (item, ind) {
                        return (
                            <tr style={{marginBottom: "20px"}} key={ind} id={item.itemName}>
                                <td>
                                    <Image roundedCircle src={item.img} width="80px"/>
                                </td>

                                <td>
                                    <h5>{item.itemName}</h5>
                                    <p>{getSize(item.size)}</p>
                                </td>

                                <td>
                                    <p>{item.quantity} x {item.price}</p>
                                </td>

                                <td>
                                    <h6>{getTotal(item.quantity, item.price)}$</h6>
                                </td>

                                <td>
                                    <CloseButton
                                        onClick={() => deleteItem(item.itemName, getTotal(item.quantity, item.price))}
                                        aria-label="Hide"/>
                                </td>

                            </tr>

                        );
                    })
                    :
                    <Load style={{width: "80px", height: "80px"}}/>
                }
                </tbody>
            </Table>
            <Row>
                <Col style={{marginTop: "50px", marginLeft: "20px"}}>
                    <h4 style={{fontWeight: "bold"}}>Total: {getPrice()}$</h4>
                </Col>
            </Row>

        </>
    );
}

export default CartContent;

