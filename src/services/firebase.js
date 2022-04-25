import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD3GaKxqH1UqPDTXCKhE5ask3DU5J6CQ9E",
    authDomain: "chat-bced4.firebaseapp.com",
    databaseURL: "https://chat-bced4-default-rtdb.firebaseio.com/",
    storageBucket: "gs://chat-bced4.appspot.com"
}

firebase.initializeApp(config)
export const auth = firebase.auth
export const db = firebase.database()
export const storage = firebase.storage()