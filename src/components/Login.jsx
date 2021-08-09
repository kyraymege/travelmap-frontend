import "./login.css";
import {useState,useRef} from "react";
import { Room,Cancel } from "@material-ui/icons";
import axios from "axios";

const Login = ({setShowLogin,myStorage,setCurrentUser}) => {
    const[error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            const res = await axios.post("/users/login", user);
            myStorage.setItem('user', res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false);
        } catch (error) {
            setError(true);
        }
    }
    
    return (
        <div className="loginContainer">
            <div className="logo">
                <Room />
                AymPin 
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={usernameRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button className="loginBtn" type="submit">Login </button>
                    {error &&
                        <span className="failure">Something went wrong!</span>
                    }                    
                </form> 
                <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/> 
        </div>
    )
}

export default Login


