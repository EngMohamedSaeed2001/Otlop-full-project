import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Container, Table} from "react-bootstrap";
import BarChart from "../Charts/BarChart";
import Api from "../../Apis/Base";
import Load from "../../Load";


let opinion = []
let colors = []
const OpinionsStat = () => {


    let [load, setLoad] = useState(false);

    const getAll = () => {
        Api.apiToken.get("admin/getAllOpinion").then((res) => {
            if (res.status === 200) {

                opinion.push(res.data)
                setLoad(true);

               // console.log(opinion[0])
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

            <h2 style={{margin: "20px"}}>All Opinions</h2>

            <Table responsive style={{marginTop: "20px", marginBottom: "50px"}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Opinion</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>

                {
                    load ?
                        opinion[0].map((op, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{op.userEmail}</td>
                                <td>{op.opinion}</td>
                                <td>{op.rate}</td>
                            </tr>

                        ))
                        :
                        <Load style={{width: "80px", height: "80px"}}/>
                }
                </tbody>
            </Table>

            <BarChart/>
        </Container>
    );
}

export default OpinionsStat;
