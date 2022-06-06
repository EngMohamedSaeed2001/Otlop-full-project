import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Container, Table} from "react-bootstrap";
import PieChart from "../Charts/PieChart";
import Api from '../../Apis/Base'
import Load from "../../Load";


let colors = []
let cat = [];
let item = [];
const MenuStats = () => {
    const [data, setData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'red',
                'blue',
                'yellow'
            ]
        },
        ],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ],
    });

    let [load, setLoad] = useState(false);

    const getAll = () => {
        Api.api.get("getAllCategory").then((res) => {
            if (res.status === 200) {
                Object.entries(res.data).map(function (obj1, ind) {
                    cat.push(obj1[1])
                    Object.entries(obj1[1].items).map(function (obj, ind1) {
                        item.push(obj[1]);
                    })
                })
                setLoad(true);
                for (let i = 0; i < cat.length; i++) {
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
            <h2 style={{margin: "20px"}}>All Categories</h2>

            <Table responsive style={{marginTop: "20px", marginBottom: "50px"}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Number Of Items</th>
                </tr>
                </thead>
                <tbody>

                {load ?
                    cat.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.items.length}</td>
                        </tr>

                    ))
                    :
                    <Load style={{width: "80px", height: "80px"}}/>

                }
                </tbody>
            </Table>

            <PieChart/>
        </Container>
    );
}

export default MenuStats;
