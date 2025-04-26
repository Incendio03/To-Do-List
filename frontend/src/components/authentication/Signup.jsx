import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import '../../styles/authentication/signup.css'

export function SignupPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function onSignup() {
        try{
            await registerUser(username, password);
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>

            <div className="signupPage">

                <div className="signupContainer">
                    <div className="inputContainer">
                        <input
                            className="signupInputs" 
                            placeholder="Enter Username"    
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            className="signupInputs"  
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="signupBtn" onClick={onSignup}>Signup</button>

                    <p className="login">Already have an account? <a href="/login">Login here</a></p>
                </div>

            </div>

        </div>
    );
}