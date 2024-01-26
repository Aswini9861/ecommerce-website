import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connect to mongoose database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in mongodb ${error}`.bgRed.white);
  }
};


export default ConnectDB