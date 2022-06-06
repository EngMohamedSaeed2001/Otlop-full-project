import {Button, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import Api from "../../../Apis/Base";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../../../firebase";
import {useParams} from "react-router-dom";

let url = "";
const UpdateCat = () => {
    const {name} = useParams()


    let [categoryNameUp, setCategoryNameUp] = useState("")
    let [categoryImgUp, setCategoryImgUp] = useState(null)
    let [file, setFile] = useState(null);
    let [show, setShow] = useState(false)
    let [loadButton, setLoadButton] = useState(true);
    let [redirect, setRedirect] = useState(false);

    const imageChange = (e) => {
        const img = e.target.files[0];
        setCategoryImgUp(URL.createObjectURL(img));
        setFile(img)


        if (!img) return

        uploadImage(img)
    }

    function uploadImage(file) {

        let storageRef = ref(storage, `categoryImages/${categoryNameUp}`);

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
                    setCategoryImgUp(url)
                    console.log(url)

                });
            }
        );


        setFile(null);
    }

    const updateCateogry = () => {

        console.log(url)
        Api.apiToken.patch("admin/updateCategory", {
            categoryName: name,
            categoryImg: url,
            newName: categoryNameUp
        }).then((res) => {
            if (res.status === 200) {
                setCategoryImgUp(null)
                setCategoryNameUp("")
                setFile(null)
                setRedirect(true)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    if (redirect === true) {
        setTimeout(() => {
            setLoadButton(true)
        }, 1000)
    }
    return (
        <Form className='form'>
            <h1 className='title'>update Category</h1>
            <Row>
                <InputGroup hasValidation controlId="CategoryName">
                    <Form.Control value={categoryNameUp} onChange={(e) => setCategoryNameUp(e.target.value)}
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

            <Button variant="primary"  className='buttonSubmit'
                    onClick={() => {
                        updateCateogry();
                        setLoadButton(false);

                    }} className='buttonSubmit'>
                update Category
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

export default UpdateCat;