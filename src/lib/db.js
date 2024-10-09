import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then((res) => {
                console.log(`Data Base Connected `);
            })
            .catch((error) => {
                console.log(error.message);
            })
    } catch (error) {
        console.log(error.message);

    }
}

export default connectDB;