const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./connect/database");
const cors = require('cors');
const port = process.env.PORT || 5000;
 connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", require("./routes/taskRouter"));
app.use("/api/users", require("./routes/userRouter"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
