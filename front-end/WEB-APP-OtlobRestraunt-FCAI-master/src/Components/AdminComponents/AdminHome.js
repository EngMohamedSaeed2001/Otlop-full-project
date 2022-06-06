import React, {useEffect, useState} from "react";
import '../../index.css';
import {Button, Container, Form, Table} from "react-bootstrap";

import {AiOutlinePlus} from "react-icons/ai";
import {Link} from "react-router-dom";
import Api from "../Apis/Base";
import Load from "../Load";

let users = []

const AdminHome = () => {
    let [suspend, setSuspend] = useState(false);
    let [upgrade, setUpgrade] = useState(false);
    let [load, setLoad] = useState(false);

    const upgradeUser = (email) => {
        Api.apiToken.post("admin/upgradeUser", {
            email: email
        }).then((res) => {
            if (res.status === 200) {
                console.log("k")
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    const unUpgradeUser = (email) => {
        Api.apiToken.post("admin/unUpgradeUser", {
            email: email
        }).then((res) => {
            if (res.status === 200) {
                console.log("k")
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    const suspendUser = (email) => {
        Api.apiToken.post("admin/suspendUser", {
            email: email
        }).then((res) => {
            if (res.status === 200) {
                console.log("k")
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    const unSuspendUser = (email) => {
        Api.apiToken.post("admin/unSuspendUser", {
            email: email
        }).then((res) => {
            if (res.status === 200) {
                console.log("k")
            }

        }).catch((e) => {
            console.log(e)
        })
    }

    const getAll = () => {
        Api.apiToken.get("admin/getAllUsers").then((res) => {
            if (res.status === 200) {
                users.push(res.data)
                setLoad(true);

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
            <h2 style={{margin: "20px"}}>All Users</h2>

            {load ?
                <Table responsive style={{marginTop: "20px", marginBottom: "50px"}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Active</th>
                        <th>Suspend</th>
                        <th>Upgrade</th>
                    </tr>
                    </thead>
                    <tbody>

                    {users[0].map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.profile.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.active ? "ON" : "OFF"}</td>

                            <td>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    //label={user.suspended ? "on" : "off"}
                                   checked={user.suspended}
                                    defaultChecked={user.suspended}
                                    onClick={() => {
                                        if (user.suspended){

                                            unSuspendUser(user.email);
                                            window.location.reload()
                                        }
                                        else{
                                            suspendUser(user.email);
                                            window.location.reload()
                                        }

                                    }
                                    }

                                />
                            </td>

                            <td>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    //label={user.profile.id === 2 ? "off":"on"}
                                    checked={user.profile.id !== 2}
                                    defaultChecked={user.profile.id}
                                    onClick={() => {
                                        if (user.profile.id === 2){
                                            upgradeUser(user.email)
                                            window.location.reload()
                                        }

                                        else{
                                            unUpgradeUser(user.email)
                                            window.location.reload()
                                        }

                                    }}


                                />
                            </td>

                        </tr>

                    ))}
                    </tbody>
                    <Link to='/addUser'>
                        <Button className="buttons">
                            <AiOutlinePlus/>
                            Add
                        </Button>
                    </Link>
                </Table>
                :
                <Load style={{width: "80px", height: "80px"}}/>

            }
        </Container>
    );
}

export default AdminHome;
