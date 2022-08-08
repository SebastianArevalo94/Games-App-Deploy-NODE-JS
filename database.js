import mongoose from "mongoose";
import "dotenv/config.js";

const atlasUrl = process.env.MONGODB_ATLAS_URL;
const localUrl = process.env.MONGODB_LOCAL_URL;

mongoose
  .connect(atlasUrl, { useNewUrlParser: true, dbName: "mern" })
  .then((db) => {
    console.log("DB connected succesfully :)");
  })
  .catch((err) => console.log(err));
