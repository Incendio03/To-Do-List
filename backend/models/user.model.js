import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, "Username is required"]
        },
        password:{
            type: String,
            required:[true, "Password is required"]
        }
    }
)

const User = mongoose.model('User', UserSchema);

export default User;