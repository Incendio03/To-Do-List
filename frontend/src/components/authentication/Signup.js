import { useState } from "react";
import { registerUser } from "../../services/authService";
import '../../styles/authentication/signup.css'

export function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function onSignup() {
        try{
            const response = await registerUser(username, password);
            alert(response.message || 'User registration success!')
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