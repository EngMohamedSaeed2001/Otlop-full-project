import React, {useState} from "react";
import '../../index.css';
import {CloseButton, Container, Row} from "react-bootstrap";
import {IoMdSearch} from "react-icons/io";
import {Navigate} from "react-router-dom";


const Searcher = (props) => {
    let [item, setItem] = useState("")
    let [check, setCheck] = useState(false)
    if (item !== "" && check)
        return <Navigate to={`/searchItem/${item}`}/>

    return (
        <>
            {props.cancel ? (
                <Container fluid className="search">
                    <Row>
                        <CloseButton id="cancelIcon" variant="white" onClick={props.hide}/>
                    </Row>
                    <Row className="searchInput">
                        <IoMdSearch style={{margin: "auto", top: "37%", left: "48%", position: "absolute"}}
                                    color="#ffff"
                                    size="45px"
                                    onClick={() => setCheck(true)}
                        />
                        <input
                            type="search"
                            placeholder="Search..."
                            className="searchForm"
                            aria-label="Search"
                            onChange={(e) => setItem(e.target.value)}
                        />
                    </Row>
                </Container>

            ) : null
            }
        </>


    );
}

export default Searcher;
