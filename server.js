import app from "./app.js";
import databaseConnection from "./config/database.js";
import dotenv from "dotenv";

//Handling uncaught  Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down due to uncaught Exception`);
  process.exit(1);
});
dotenv.config({ path: "./config/config.env" });

//database connection
databaseConnection();

app.listen(process.env.PORT, () => {
  console.log(`server is working on port: ${process.env.PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise Rejection`);

  server.close(() => {
    //it's used to crashed the server so that cant show & it will created at last
    process.exit(1);
  });
});
