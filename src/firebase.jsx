import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADvz_mjXUiK_fIFgp_OhYMdajGuknXCKg",
  authDomain: "cs124-lab3-e988f.firebaseapp.com",
  projectId: "cs124-lab3-e988f",
  storageBucket: "cs124-lab3-e988f.appspot.com",
  messagingSenderId: "44711953269",
  appId: "1:44711953269:web:74032e4854f83511c5c93c",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
