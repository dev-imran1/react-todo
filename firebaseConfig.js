import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC1qTsDar5NziLRsgnaz22YrpTQwJBSG5M",
  authDomain: "fir-todo-9fecb.firebaseapp.com",
  projectId: "fir-todo-9fecb",
  storageBucket: "fir-todo-9fecb.appspot.com",
  messagingSenderId: "981371521012",
  appId: "1:981371521012:web:cf200fb9dd0aa599a35ba1"
};

export default firebaseConfig
const app = initializeApp(firebaseConfig)