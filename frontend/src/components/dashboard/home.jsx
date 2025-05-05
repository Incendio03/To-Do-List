import { useState, useEffect } from "react";
import { getUserByUsername } from '../../services/userService.js';
import { getCurrentUser } from "../../services/authService.js";
import { createList, getUserLists } from "../../services/listService.js";
import Modal from 'react-modal';
import '../../styles/dashboard/home.css';

export function HomePage() {

    Modal.setAppElement('#root')

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lists, setLists] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function onSave() {
        try {
            await createList(title, description)
            
            setTitle('');
            setDescription('');

            closeModal()

            const updatedListsData = await getUserLists();
            setLists(updatedListsData.data || []);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>

            <h2 className="welcomeMessage">Hello, {user?.username}</h2>

            <input className="searchInput" placeholder="Search List"></input>

            <button className="createBtn" onClick={openModal}>Create List</button>

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

            <Modal
                isOpen={modalIsOpen}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                
                <h2 className="modal-header">Create a New List</h2>
                
                <form className="modal-form">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Description</label>
                    <input                        
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    /> 
                </form>

                <div className="modal-buttons">
                    <button className="modal-close-btn" onClick={closeModal}>Close</button>
                    <button className="modal-save-btn" onClick={onSave}>Save</button>
                </div>
            </Modal>
        </div>
    );
}
