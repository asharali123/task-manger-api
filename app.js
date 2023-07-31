const express = require("express");
const app = express();
const router = require("./routes/router.js");
const connectDB = require("./config/connectdb.js");
const cors = require("cors")
require("dotenv").config();
let PORT = process.env.PORT || 3000;

//middelware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/task-manger", router);

//Database
let DataBaseurl = process.env.DataBaseurl || console.log("Cant find database")
connectDB(DataBaseurl);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})