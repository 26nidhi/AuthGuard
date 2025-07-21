import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
        console.log("DataBase connected : ", connectionInstance.connection.host);
    }
    catch (err) {
        console.log("MONGODB connection error : ", err);
    }

}

export default connectDB;