import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBglr-nM-bGCsz3f-_KMZ5To-VeEq13Bzs",
    authDomain: "e42store.firebaseapp.com",
    projectId: "e42store",
    storageBucket: "e42store.appspot.com",
    messagingSenderId: "622465330417",
    appId: "1:622465330417:web:c8b5941759a72ce9564d50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app