import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
apiKey: "AIzaSyChyTphU1B1ibHLMYdAGyGJAvmLHBteg",
authDomain: "thryvetrade.firebaseapp.com",
databaseURL: "https://thryvetrade-default-rtdb.firebaseio.com",
projectId: "thryvetrade",
storageBucket: "thryvetrade.appspot.com",
messagingSenderId: "903543761181",
appId: "1:903543761181:web:8be4bc9d18368480385d57",
measurementId: "G-4L16CLXC2W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);