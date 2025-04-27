import { useState, useEffect } from "react";
import { getUserByUsername } from '../../services/userService.js';
import { getCurrentUser } from "../../services/authService.js";
import { createList, getUserLists } from "../../services/listService.js";
import '../../styles/dashboard/home.css';

export function HomePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lists, setLists] = useState([]);

    // If component is already mounted, this will be used
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = getCurrentUser();
                if(!currentUser || !currentUser.id) {
                    throw new Error("Not logged in");
                }

                const userData = await getUserByUsername(currentUser.username);
                setUser(userData);

                const listsData = await getUserLists();
                setLists(listsData.data || []);

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

    async function createNewList() {
        try {
            await createList(title, description);
        } catch (error) {
            
        }
    }

    return (
        <div>

            <h2 className="welcomeMessage">Hello, {user?.username}</h2>

            <input className="searchInput" placeholder="Search List"></input>

            <button className="createBtn" onClick={createNewList}>Create List</button>

            <div className="divider">LISTS</div>

            <div className="listContainer">
                <div className="listBox">
                    <ul className="lists">
                    {lists.map((list, index) => (
                        
                        <li key={list._id || index}>
                            <h3>{list.title}</h3> 
                            <p>{list.description}</p>
                        </li> 
                    ))}
                    </ul>
                </div>
            </div>
            
        </div>
    );
}