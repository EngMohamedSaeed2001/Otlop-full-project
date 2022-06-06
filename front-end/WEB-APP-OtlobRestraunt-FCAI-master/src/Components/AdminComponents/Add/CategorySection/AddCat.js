import React, {useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from 'react-bootstrap';
import './AddCat.css';
import Api from "../../../Apis/Base"
import ToastMsg from '../../../UserComponents/Toast';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";
import UpdateCat from "./UpdateCat";

let url = "";

const AddCat = () => {
    let [categoryName, setCategoryName] = useState("")
    let [categoryImg, setCategoryImg] = useState("")

    let [categoryNameUp, setCategoryNameUp] = useState("")
    let [categoryImgUp, setCategoryImgUp] = useState(null)
    let [file, setFile] = useState(null);
    let [show, setShow] = useState(false)
        let [prg, setPrg] = useState(0)


    const imageChange = (e) => {
        const img = e.target.files[0];
        setCategoryImg(URL.createObjectURL(img));
        setFile(img)


        if (!img) return

        uploadImage(img)
    }

    function uploadImage(file) {

        let storageRef = ref(storage, `categoryImages/${categoryName}`);

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
                    setCategoryImg(url)
                    console.log(url)

                });
            }
        );


        setFile(null);
    }

    const addCategory = () => {

        Api.apiToken.post("admin/addCategory", {
            categoryPhoto: url,
            categoryName: categoryName,
        }).then((res) => {
            if (res.status === 200) {
                console.log(categoryName)

                setCategoryImg(null)
                setCategoryName("")
                setFile(null)
            }
        }).catch((e) => {
            console.log(e)
        })
    }


    return (
        <Container fluid>
            <Row className='formSection'>
                <ToastMsg show={show} setShow={() => setShow(false)} msg="Category has been added successfully"/>
                <Col lg={true}>
                    <Form className='form'>
                        <h1 className='title'>Add Category</h1>
                        <Row>
                            <InputGroup hasValidation controlId="CategoryName">
                                <Form.Control value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
                                              type="text" required placeholder='Category Name'/>
                            </InputGroup>
                        </Row>
                        <br></br>
                        <Row>
                            <input accept="image/*" id="icon-button-file" onChange={imageChange}
                                   type="file"/>
                        </Row>
                        <br></br>
                        <br></br>
                        <Button variant="primary" disabled={!(categoryName.length !== 0)} className='buttonSubmit'
                                onClick={() => addCategory()}>
                            add Category
                        </Button>
                    </Form>
                </Col>
                <Col lg={true}>
                    <UpdateCat/>
                </Col>

            </Row>
        </Container>
    );
}

export default AddCat;