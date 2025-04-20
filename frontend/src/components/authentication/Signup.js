import { useState } from "react";
import { registerUser } from "../../services/authService";

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

            <input placeholder="Username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)} />

            <input placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)} />

            <button onClick={onSignup}>Sign Up</button>

        </div>
    );
}