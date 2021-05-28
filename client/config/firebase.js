import firebase from 'firebase'
import config from '../config'

const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId:config. MESSAGE_SENDER_ID,
    appId: config.APP_ID
}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase