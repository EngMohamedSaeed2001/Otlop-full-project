import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import './AddItem.css';
import Api from "../../../Apis/Base"
import ToastMsg from '../../../UserComponents/Toast';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";
import Load from "../../../Load";
import UpdateItem from "./UpdateItem";

let categoryList = []
let url = "";

const AddItem = () => {
    let [itemName, setItemName] = useState("")
    let [itemPrice, setItemPrice] = useState("")
    let [itemFats, setItemFats] = useState("")
    let [itemCalories, setItemCalories] = useState("")
    let [itemDescription, setItemDescription] = useState("")
    let [itemImg, setItemImg] = useState(null)
    let [file, setFile] = useState(null);
    let [load, setLoad] = useState(false)
    let [loadButton, setLoadButton] = useState(true);
    let [redirect, setRedirect] = useState(false);
    let [show, setShow] = useState(false)
    let [category, setCategory] = useState("")

    const imageChange = (e) => {
        const img = e.target.files[0];
        setItemImg(URL.createObjectURL(img));
        setFile(img)

        if (!img) return

        uploadImage(img)
    }

    function uploadImage(file) {

        let storageRef = ref(storage, `itemImages/${itemName}`);

        let uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    url = downloadURL;
                    setItemImg(url)

                });
            }
        );


        setFile(null);
    }

    const addItem = () => {
        Api.apiToken.post(`admin/addItem/${category}`, {
            itemName: itemName,
            des: itemDescription,
            img: itemImg,
            price: itemPrice,
            fats: itemFats,
            calories: itemCalories
        }).then((res) => {
            if (res.status === 200) {
                setItemName("")
                setItemPrice("")
                setItemCalories("")
                setItemFats("")
                setItemImg(null)
                setFile(null)
                setItemDescription("")
                setRedirect(true)

            }
        }).catch((e) => console.log(e))
    }


    useEffect(() => {
            let canc = false;
if (!canc) {
    setTimeout(() => {
        Api.api.get("getAllCategory").then((res) => {
            if (res.status === 200) {

                categoryList=res.data;
                 setLoad(true)

            }
        }).catch((e) => console.log(e));


    }, 1000)
}
  return () => {
            canc = true;
        }

    }, [])

    if (redirect === true) {
        setTimeout(() => {
            setLoadButton(true)
        }, 1000)
    }
    return (
        <Container fluid>
            <Row className='formSection'>
                <ToastMsg show={show} setShow={() => setShow(false)} msg="Category has been added successfully"/>
                <Col lg={true}>
                    <Form className='form'>
                        <h1 className='title'>Add item</h1>
                        {load ?
                            <Row>
                                <InputGroup hasValidation>
                                    <Form.Select
                                        style={{width: "98%"}}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option>Select a category</option>
                                        {categoryList.map(function (item, ind) {
                                            return (

                                                <option key={ind} value={item.categoryName}>{item.categoryName}</option>
                                            );
                                        })}
                                    </Form.Select>
                                </InputGroup>

                            </Row>
                            :
                            <Load style={{width: "80px", height: "80px"}}/>
                        }
                        <br></br>
                        <Row>
                            <InputGroup hasValidation controlId="itemName">
                                <Form.Control type="text" required placeholder='Item Name' value={itemName}
                                              onChange={(e) => setItemName(e.target.value)}/>
                            </InputGroup>

                        </Row>
                        <br></br>
                        <Row>
                            <InputGroup hasValidation controlId="itemPrice">
                                <Form.Control type="number" required placeholder='Item Price'
                                              value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>
                            </InputGroup>
                        </Row>
                        <br></br>
                        <Row>
                            <InputGroup hasValidation controlId="itemFats">
                                <Form.Control type="number" required placeholder='Item Fats' value={itemFats}
                                              onChange={(e) => setItemFats(e.target.value)}/>
                            </InputGroup>
                        </Row>
                        <br></br>
                        <Row>
                            <InputGroup hasValidation controlId="itemCalroies">
                                <Form.Control type="number" required placeholder='Item Calories'
                                              value={itemCalories} onChange={(e) => setItemCalories(e.target.value)}/>
                            </InputGroup>
                        </Row>
                        <br></br>
                        <Row>
                            <input accept="image/*" id="icon-button-file" onChange={imageChange}
                                   type="file"/>
                        </Row>
                        <br></br>
                        <Row>
                            <InputGroup hasValidation controlId="itemDescription">
                                <Form.Control as="textarea" rows={6} required
                                              placeholder="Type item description" value={itemDescription}
                                              onChange={(e) => setItemDescription(e.target.value)}/>
                            </InputGroup>
                        </Row>
                        <br></br>
                        <Button variant="primary"
                                disabled={!(itemName.length !== 0 && itemDescription.length !== 0 && itemCalories.length !== 0 && itemFats.length !== 0)}
                                onClick={() => {
                                    addItem()
                                    setLoadButton(false);
                                    addItem()
                                }} className='buttonSubmit'>
                            add item
                            {loadButton ?
                                null
                                :
                                <Spinner animation="border" size={"sm"}
                                         style={{color: "#ffffff", marginLeft: "8%"}}/>
                            }

                        </Button>
                    </Form>
                </Col>
                <Col lg={true}>
                    <UpdateItem/>
                </Col>
            </Row>
        </Container>
    );
}

export default AddItem;