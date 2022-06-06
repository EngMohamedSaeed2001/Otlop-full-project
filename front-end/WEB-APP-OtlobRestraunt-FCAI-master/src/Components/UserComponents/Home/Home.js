import React, {useEffect, useState} from "react";
import '../../../index.css';
import {Container} from "react-bootstrap";
import Header from "./Header";
import MiddleHome from "./MiddleHome";
import Api from "../../Apis/Base";

const Home = (props) => {
    let [item, setItem] = useState([]);
    let [cat, setCat] = useState([]);
    let [load, setLoad] = useState(false);



    useEffect(() => {
        let canc = false;
        setTimeout(() => {
            if (!canc) {
                Api.api.get("getAllCategory").then((res) => {
                    if (res.status === 200) {
                        setLoad(true);
                        setItem(res.data[0].items);
                        setCat(res.data);

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
        <Container fluid>
            <Header items={item} cat={cat} load={load}/>
            <MiddleHome items={item} cat={cat} load={load}/>
        </Container>
    );
}

export default Home;
