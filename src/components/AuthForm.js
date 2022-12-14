import React, {useState} from "react";
import { authService } from "fbInstace";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        }
        if(name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = await createUserWithEmailAndPassword(authService,email,password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error.message);
            setErrorMsg(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <form onSubmit={onSubmit} className="container">
            <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} className="authInput" />
            <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} className="authInput" />
            <input type="submit" value={newAccount ? "Create Account" : "LogIn"} className="authInput authSubmit" />
            <span onClick={toggleAccount} className="authSwitch"> {newAccount? "Log IN" : "Create New Account"} </span>
            {errorMsg && <span className="authError">{errorMsg}</span>}
        </form>
    )
}

export default AuthForm;