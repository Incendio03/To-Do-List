import { useState } from "react";
import { loginUser } from "../../services/authService";
import '../../styles/authentication/login.css';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function onLogin() {
        try {
            const response = await loginUser(username, password);
            alert(response.message || "Login successful!");
        } catch (error){
            alert(error.message);
        }
    }

    return (
        <div className="loginPage">
            <section className="introContainer">
                <h1>Lexo</h1>
                <p>Your modern workspace for managing tasks with clarity and control. <br/>Stay focused, organized, and ahead of your day — all in one to-do list app.</p>
            </section>
            <div className="loginContainer">
                <div className="inputContainer">
                    <input
                        className="loginInputs" 
                        placeholder="Enter Username"    
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="loginInputs"  
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                </div>

                <a href="#" className="forgotPassword">Forgot Password?</a>

                <button className="loginBtn" onClick={onLogin}>Login</button>

                <p className="register">Not yet registered? <a href="/signup">Register here</a></p>
            </div>
        </div>
    );
}