import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './index.css';

import Footer from "./Components/UserComponents/Footer";
import Home from "./Components/UserComponents/Home/Home";
import Opinion from "./Components/UserComponents/Opinion";
import Navs from "./Components/UserComponents/Navs";
import Menu from "./Components/UserComponents/Menu/Menu";
import Item from "./Components/UserComponents/Menu/Item";
import Information from "./Components/UserComponents/Cart/Information";
import ForgetForm from "./Components/UserComponents/Register/ForgetPassword/ForgetForm";
import ForgetFormEmail from "./Components/UserComponents/Register/ForgetPassword/ForgetFormEmail";
import Wait from "./Components/UserComponents/Register/ForgetPassword/Wait";
import OpinionsStat from "./Components/AdminComponents/Statistics/OpinionsStat";
import OrdersStat from "./Components/AdminComponents/Statistics/OrdersStat";
import AdminHome from "./Components/AdminComponents/AdminHome";
import MenuStats from "./Components/AdminComponents/Statistics/MenuStat";
import Login from "./Components/UserComponents/Register/Login";
import SignUp from "./Components/UserComponents/Register/SignUp";
import Error from "./Components/Error";
import UserProfile from "./Components/UserComponents/Profile/UserProfile";
import AddUser from "./Components/AdminComponents/Add/AddUser";
import {ProtectedUser} from "./Components/Guard/GuardUser";
import {ProtectedAdmin} from "./Components/Guard/GuardAdmin";
import ContactUS from "./Components/UserComponents/ContactUs/ContactUs";
import Location from "./Components/UserComponents/Locations/Location";
import SideAd from "./Components/Ads";
import AddItem from "./Components/AdminComponents/Add/ItemSection/AddItem";
import AddCat from "./Components/AdminComponents/Add/CategorySection/AddCat";
import EnterPassword from "./Components/UserComponents/Register/ForgetPassword/EnterPassword";
import Payments from "./Components/UserComponents/Cart/Payment";
import SearchRes from "./Components/UserComponents/Menu/SearchRes";
import Api from "./Components/Apis/Base";
import Contact from "./Components/AdminComponents/Statistics/Contacts";

///////////////////////////////////////////////////

let token = "";
function App() {



    return (

        <Router>
            <div className="App">

                <Navs/>

                <Routes>

                    <Route path='/' element={<Home/>}/>

                    <Route path='/signUp' element={<SignUp/>}/>

                    <Route path='/login' element={<Login/>}/>

                    <Route path='/forgetPassword/:otp' element={<ForgetForm/>}/>

                    <Route path='/verifyEmail/:otp' element={<EnterPassword/>}/>


                    <Route path='/resetPassword/' element={<ForgetFormEmail/>}/>
                    <Route path='/wait' element={<Wait/>}/>
                    <Route path='/*' element={<Error one={"4"} two={"0"} three={"4"} msg={"Page Not Found"}/>}/>

                    {/*======================================================*/}
                    <Route exact path='/userProfile' element={<ProtectedUser/>}>
                        <Route exact path='/userProfile' element={<UserProfile/>}/>
                    </Route>

                    <Route exact path='/info' element={<ProtectedUser/>}>
                        <Route path='/info' element={<Information/>}/>
                    </Route>

                    <Route exact path="/pay" element={<ProtectedUser/>}>
                        <Route path="/pay" element={<Payments/>}/>
                    </Route>

                    <Route exact path='/item/:name' element={<ProtectedUser/>}>
                        <Route path='/item/:name' element={<Item/>}/>
                    </Route>

                    <Route exact path='/Menu/:name' element={<ProtectedUser/>}>
                        <Route path='/Menu/:name' element={<Menu/>}/>
                    </Route>

                    <Route exact path='/searchItem/:name' element={<ProtectedUser/>}>
                        <Route path='/searchItem/:name' element={<SearchRes/>}/>
                    </Route>

                    <Route exact path='/rate' element={<ProtectedUser/>}>
                        <Route path='/rate' element={<Opinion/>}/>
                    </Route>

                    <Route path='/contact' element={<ContactUS/>}/>
                    <Route path='/location' element={<Location/>}/>

                    {/*//////////////////////////////////ADMIN////////////////////////////////////////////////*/}
                    <Route exact path='/admin' element={<ProtectedAdmin/>}>
                        <Route path='/admin' element={<AdminHome/>}/>
                    </Route>

                    <Route exact path='/adminCategory' element={<ProtectedAdmin/>}>
                        <Route path='/adminCategory' element={<MenuStats/>}/>
                    </Route>

                    <Route exact path='/adminOpinions' element={<ProtectedAdmin/>}>
                        <Route path='/adminOpinions' element={<OpinionsStat/>}/>
                    </Route>

                    <Route exact path='/adminContact' element={<ProtectedAdmin/>}>
                        <Route path='/adminContact' element={<Contact/>}/>
                    </Route>

                    <Route exact path='/adminOrder' element={<ProtectedAdmin/>}>
                        <Route path='/adminOrder' element={<OrdersStat/>}/>
                    </Route>

                    {/*///////////////////////ADD/////////////////////////////*/}
                    <Route exact path='/addUser' element={<ProtectedAdmin/>}>
                        <Route path='/addUser' element={<AddUser/>}/>
                    </Route>

                    <Route exact path='/addItem' element={<ProtectedAdmin/>}>
                        <Route path='/addItem' element={<AddItem/>}/>
                    </Route>

                    <Route exact path='/updateItem/:name' element={<ProtectedAdmin/>}>
                        <Route path='/updateItem/:name' element={<AddItem/>}/>
                    </Route>

                    <Route exact path='/addCategory' element={<ProtectedAdmin/>}>
                        <Route path='/addCategory' element={<AddCat/>}/>
                    </Route>

                    <Route exact path='/updateCategory/:name' element={<ProtectedAdmin/>}>
                        <Route path='/updateCategory/:name' element={<AddCat/>}/>
                    </Route>

                </Routes>
                <SideAd/>
                <Footer/>


            </div>
        </Router>


    );
}

export default App;
