import {Button, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Api from "../../../Apis/Base";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";
import {useParams} from "react-router-dom";

let url = "";
let categoryListUp = []
const UpdateItem = () => {
    const {name} = useParams()

    let [itemNameUp, setItemNameUp] = useState("")
    let [itemPriceUp, setItemPriceUp] = useState("")
    let [itemFatsUp, setItemFatsUp] = useState("")
    let [itemCaloriesUp, setItemCaloriesUp] = useState("")
    let [itemDescriptionUp, setItemDescriptionUp] = useState("")
    let [itemImgUp, setItemImgUp] = useState(null)
    let [fileUp, setFileUp] = useState(null);
    let [load, setLoad] = useState(false)
    let [loadButton, setLoadButton] = useState(true);
    let [redirect, setRedirect] = useState(false);
    let [show, setShow] = useState(false)
    let [categoryUp, setCategoryUp] = useState("")

    const imageChange = (e) => {
        const img = e.target.files[0];
        setItemImgUp(URL.createObjectURL(img));
        setFileUp(img)

        if (!img) return

        uploadImage(img)
    }

    function uploadImage(file) {

        let storageRef = ref(storage, `itemImages/${itemNameUp}`);

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
                    setItemImgUp(url)

                });
            }
        );


        setFileUp(null);
    }

    const updateItem = () => {
        Api.apiToken.patch(`admin/updateItem/${name}`, {
            itemName: itemNameUp,
            des: itemDescriptionUp,
            img: itemImgUp,
            price: itemPriceUp,
            fats: itemFatsUp,
            calories: itemCaloriesUp
        }).then((res) => {
            if (res.status === 200) {
                setItemNameUp("")
                setItemPriceUp("")
                setItemCaloriesUp("")
                setItemFatsUp("")
                setItemImgUp(null)
                setFileUp(null)
                setRedirect(true)
            }
        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        setTimeout(() => {
            Api.api.get("getAllCategory").then((res) => {
                if (res.status === 200) {

                     categoryListUp=res.data;
                    setLoad(true)

                }
            }).catch((e) => console.log(e));


        }, 1000)

    }, [])

    if (redirect === true) {
        setTimeout(() => {
            setLoadButton(true)
        }, 1000)
    }
    return (
        <Form className='form'>
            <h1 className='title'>update item</h1>
            <Row>
                <InputGroup hasValidation>
                    <Form.Select
                        style={{width: "98%"}}
                        value={categoryUp}
                        onChange={(e) => setCategoryUp(e.target.value)}
                    >
                        {categoryListUp.map(function (item, ind) {
                            return (
                                <option key={ind} value={item.categoryName}>{item.categoryName}</option>
                            );
                        })}
                    </Form.Select>
                </InputGroup>
            </Row>
            <br></br>
            <Row>
                <InputGroup hasValidation controlId="itemName">
                    <Form.Control type="text" required placeholder='Item Name' value={itemNameUp}
                                  onChange={(e) => setItemNameUp(e.target.value)}/>
                </InputGroup>

            </Row>
            <br></br>
            <Row>
                <InputGroup hasValidation controlId="itemPrice">
                    <Form.Control type="number" required placeholder='Item Price'
                                  value={itemPriceUp} onChange={(e) => setItemPriceUp(e.target.value)}/>
                </InputGroup>
            </Row>
            <br></br>
            <Row>
                <InputGroup hasValidation controlId="itemFats">
                    <Form.Control type="number" required placeholder='Item Fats' value={itemFatsUp}
                                  onChange={(e) => setItemFatsUp(e.target.value)}/>
                </InputGroup>
            </Row>
            <br></br>
            <Row>
                <InputGroup hasValidation controlId="itemCalroies">
                    <Form.Control type="number" required placeholder='Item Calories'
                                  value={itemCaloriesUp} onChange={(e) => setItemCaloriesUp(e.target.value)}/>
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
                                  placeholder="Type item description" value={itemDescriptionUp}
                                  onChange={(e) => setItemDescriptionUp(e.target.value)}/>
                </InputGroup>
            </Row>
            <br></br>

            <Button variant="primary"
                    disabled={!(itemNameUp.length !== 0 || itemDescriptionUp.length !== 0 || itemCaloriesUp.length !== 0 || itemFatsUp.length !== 0)}
                    onClick={() => {
                        setLoadButton(false);
                        updateItem()
                    }} className='buttonSubmit'>
                update item
                {loadButton ?
                    null
                    :
                    <Spinner animation="border" size={"sm"}
                             style={{color: "#ffffff", marginLeft: "8%"}}/>
                }

            </Button>
        </Form>

    )

}

export default UpdateItem;