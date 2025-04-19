import User from "../models/user.model.js";

const authenticateUser = async (req, res) => {
    try {
        const {username, password} = req.body //This is your request

        //Check if inputs are blank
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password is required"
            });
        };

        //Find user by username
        const user = await User.findOne({username});

        //Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "Invalid username of password"
            });
        };

        const isPasswordValid = (password === user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        };

        res.status(200).json({
            message: "Login Successful!"
        })
    } catch (error) {
        console.log("Login error!", error)
        res.status(500).json({
            message: "An error occured during login."
        });
    }
};

export {
    authenticateUser
};