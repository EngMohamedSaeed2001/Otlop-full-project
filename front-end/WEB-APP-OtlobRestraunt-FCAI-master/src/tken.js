import {collection, getDocs, getFirestore} from "firebase/firestore";


let email = `${localStorage.getItem("user_email")}`
let access_token = "";

const getToken = async (data, collection) => {

    const docSnap = await getDocs(collection);
    (docSnap).forEach(item => {
        if (item.data().email === email) {
             access_token=item.data().token
        }
    })

}

const data = getFirestore()
const collections = collection(data, 'Tokens')
getToken(data, collections);

export default {access_token} ;
