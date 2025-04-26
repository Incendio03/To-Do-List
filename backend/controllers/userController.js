import User from "../models/user.model.js";

const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    try{ 
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }

        // Return only non-sensitive use data
        res.status(200).json({
            id: user._id,
            username: user.username
            // Add other non-sesnsitve fields here like Emails, Phone, Address
        });
    } catch (error) {
        console.error("Error fetching user details", error)
        res.status(500).json({ message: "Server error"});
    }
};

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({ message: "Username is required"});
        }

        const user = await User.findOne({username});

        if(!user) {
            return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json({
            id: user._id,
            username: user.username
        });
    } catch (error) {
        console.error("Error fetching user by username", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { getUserProfile, getUserByUsername };