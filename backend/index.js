const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./routes/taskRoutes");
app.use("/api/tasks", routes);


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log("DB Error:", err);
});


app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
