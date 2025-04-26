import { useState, useEffect } from "react";
import { getUserByUsername } from '../../services/userService.js';
import { getCurrentUser } from "../../services/authService.js";

export function HomePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // If component is already mounted, this will be used
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = getCurrentUser();
                if(!currentUser || currentUser.id) {
                    throw new Error("Not logged in");
                }

                const userData = await getUserByUsername(currentUser.username);
                setUser(userData);

            } catch (error) {
                setError(error.message);
                console.error("Error fetching use", error);
            }finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h1>LEXO</h1>

            <h2>Hello, {user?.username}</h2>
        </div>
    );
}