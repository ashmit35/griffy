import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';


const Authentication = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCFo1UR1TLoGfhusgSUGHLUHb0MIR96QSQ",
        authDomain: "giffy-3557a.firebaseapp.com",
        projectId: "giffy-3557a",
        storageBucket: "giffy-3557a.appspot.com",
        messagingSenderId: "644099496659",
        appId: "1:644099496659:web:ee145247538781e7669226",
        measurementId: "G-J5BCR54KVQ"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");

    const uploadData = async (username, email, password,userId) => {
        const db = getDatabase();

        await set(ref(db, 'users/' + userId), {
            username: username,
            email: email,
            password: password
        });
    }
    const createAccount = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                uploadData(username, email, password, user.uid);
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    const login = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (


        <div>
            <form onSubmit={isLogin ? login : createAccount}>
                {!isLogin && (<label>
                    Username:
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />
                </label>)}

                <label>
                    email:
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    password:
                    <input type="password" name="password" required onChange={(e) => setPasswrod(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "SignUp" : "LogIn"}</button>
        </div >
    )
}

export default Authentication