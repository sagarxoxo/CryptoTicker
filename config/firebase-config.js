import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA4qmqsNTNUC-A7QNXUMOzkNywGYFQisPU",
    authDomain: "crypto-ticker-606c1.firebaseapp.com",
    projectId: "crypto-ticker-606c1",
    storageBucket: "crypto-ticker-606c1.appspot.com",
    messagingSenderId: "298068785",
    appId: "1:298068785:web:b93e0b13b2087f919cde10",
    measurementId: "G-KNB008TFQL"
  };

  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);

  export const auth = getAuth();

  export const provider = new GoogleAuthProvider();
