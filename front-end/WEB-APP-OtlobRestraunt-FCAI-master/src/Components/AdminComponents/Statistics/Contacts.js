import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Container, Table} from "react-bootstrap";
import BarChart from "../Charts/BarChart";
import Api from "../../Apis/Base";
import Load from "../../Load";


let opinion = []
let colors = []
const Contact = () => {


    let [load, setLoad] = useState(false);

    const getAll = () => {
        Api.apiToken.get("admin/getAllContactUs").then((res) => {
            if (res.status === 200) {

                opinion.push(res.data)
                setLoad(true);

                //console.log(opinion)
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

            <h2 style={{margin: "20px"}}>All Contacts</h2>

            <Table responsive style={{marginTop: "20px", marginBottom: "50px"}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>

                {
                    load ?
                        opinion[0].map((op, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                 <td>{op.firstName}</td>
                                 <td>{op.secondName}</td>
                                <td>{op.email}</td>
                                <td>{op.subject}</td>
                                <td>{op.message}</td>
                            </tr>

                        ))
                        :
                        <Load style={{width: "80px", height: "80px"}}/>
                }
                </tbody>
            </Table>

        </Container>
    );
}

export default Contact;
