import User from "../models/user.model.js";

const registerUser  = async (req, res) => {
    try {
        const {username, password} = req.body
    
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and Password is required!"
            });
        };

        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(400).json({
                message: "This user already exists!"
            });
        }

        await User.create({username, password});

        res.status(201).json({
            message: "User Registration Successful!"
        });

    } catch (error) {
        console.log("Registration failed!", error);
        res.status(500).json({
            message: "An error occured during registration!"            
        });
    }
}

export {
    registerUser
};