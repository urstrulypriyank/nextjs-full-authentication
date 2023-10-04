import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb Connected Succesfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDb Connection error | Make Sure MongoDb is running " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Someting went wrong | error code #ALPHA2");
  }
}
