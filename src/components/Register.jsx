import "./register.css";
import {useState,useRef} from "react";
import { Room,Cancel } from "@material-ui/icons";
import axios from "axios";

const Register = ({setShowRegister}) => {

    const[success, setSuccess] = useState(false);
    const[error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            await axios.post("/users/register", newUser);
            setError(false);
            setSuccess(true);
        } catch (error) {
            setError(true);
        }
    }
    
    return (
        <div className="registerContainer">
            <div className="logo">
                <Room />
                AymPin
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={usernameRef}/>
                    <input type="email" placeholder="email" ref={emailRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button className="registerBtn" type="submit">Register</button>
                    {success &&
                        <span className="success">Successfull. You can login now!</span>
                    }
                    {error &&
                        <span className="failure">Something went wrong!</span>
                    }                    
                </form> 
                <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}/> 
        </div>
    )
}

export default Register


