import { useState } from "react";
import { loginUser } from "../../services/authService";

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
        <div>
            <input 
                placeholder="Enter Username"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={onLogin}>Login</button>
        </div>
    );
}