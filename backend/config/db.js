import { connect } from "mongoose";

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });

        console.log(`✅ MongoDB connected`);
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
};

export default connectDB;
