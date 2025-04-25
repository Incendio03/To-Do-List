import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        });

        console.log(`Connected to Database: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnection;