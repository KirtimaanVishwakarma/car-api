import mongoose from "mongoose";

const mongodb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) =>
      console.log(`mongodb is connected with ${data.connection.host}`)
    );
};

export default mongodb;
