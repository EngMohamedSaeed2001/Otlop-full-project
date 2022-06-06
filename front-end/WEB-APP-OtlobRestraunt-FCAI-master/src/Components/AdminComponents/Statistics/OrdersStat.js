import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Container, Table} from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import Api from "../../Apis/Base";
import Load from "../../Load";


let colors = [];
let order = []
const OrdersStat = () => {


    let [load, setLoad] = useState(false);

    const getAll = () => {
        Api.apiToken.get("admin/getAllOrderDetails").then((res) => {
            if (res.status === 200) {
                order.push(res.data)
                setLoad(true);
                for (let i = 0; i < order.length; i++) {
                    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                    colors.push(randomColor)
                }
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        let canc = false;
        setTimeout(() => {
            if (!canc) {
                getAll()
            }

        }, 1000)

        return () => {
            canc = true;
        }
    }, [])

    return (
        <Container fluid>
            <h2 style={{margin: "20px"}}>All Orders</h2>

            <Table responsive style={{marginTop: "20px", marginBottom: "50px"}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Total Price</th>
                </tr>
                </thead>
                <tbody>

                {load ?
                    order[0].map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.userEmail}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.orderPrice}</td>
                        </tr>

                    ))
                    :
                    <Load style={{width: "80px", height: "80px"}}/>

                }
                </tbody>
            </Table>

            <LineChart/>
        </Container>
    );
}

export default OrdersStat;
