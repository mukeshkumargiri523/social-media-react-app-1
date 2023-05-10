const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");
dotenv.config();
//mongodb comnnection using mongoose
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected!"));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.get("/", (req, res) => {
  res.send("this is homepage");
});
app.get("/users", (req, res) => {
  res.send("this is userspage");
});



app.listen(8080, () => {
  console.log("Server is ready ");
});

