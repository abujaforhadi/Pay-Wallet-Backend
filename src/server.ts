import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./config/env";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server : Server


const startServer = async()=> {
  try {
    
    await mongoose.connect(envVars.DB_URL)



    console.log("connected to MongoDb database")
  
    // server = app.listen(5000, () => {
    //   console.log("Server is running on port 5000");
    // });

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`);
    });
    

  } catch (error) {
     
    console.log(error)
  }
}
(async() => {
  await startServer();
})();