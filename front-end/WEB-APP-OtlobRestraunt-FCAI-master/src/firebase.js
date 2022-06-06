// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {collection, getDocs, getFirestore} from "firebase/firestore";

import api from "../src/Components/Apis/Base";

const firebaseConfig = {
    apiKey: "AIzaSyDiH-M9LCmJro_dAdMi9NwA9RtNc5dUsQU",
    authDomain: "otlob-restaurant-348810.firebaseapp.com",
    projectId: "otlob-restaurant-348810",
    storageBucket: "otlob-restaurant-348810.appspot.com",
    messagingSenderId: "429228535017",
    appId: "1:429228535017:web:fbb5a8fbff58dcef8e9478",
    measurementId: "G-KE3QHEF6GH"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const dataBase = getFirestore(app);



export {storage, dataBase};

