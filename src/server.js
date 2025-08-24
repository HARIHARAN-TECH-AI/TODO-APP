const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyparser.json());

mongoose
  .connect("mongodb://localhost:27017/Chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch(() => console.log("MongDB connection is failed"));

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Model = mongoose.model("Details", Schema);

app.post("/api/insert", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(name === "" && email === "" && password === "") {
        res
      .status(200)
      .json({ success: false, message: "Please Add Details" });
    }
    else {
    const NewUser = new Model({ name, email, password });
    await NewUser.save();
    res
      .status(200)
      .json({ success: true, message: "User Added Successfully..." });
}
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong Please Try again Later...",
    });
  }
});

app.get("/api/find", async (req, res) => {
  try {
    const FindUser = await Model.find();
    res.status(200).json({ success: true, data: FindUser });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong Please Try again Later...",
    });
  }
});

app.put("/api/update/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const UpdUser = await Model.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    res.status(200).json({ success: true, data: UpdUser });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong Please Try again Later...",
    });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

     await Model.findByIdAndDelete(id);

      res
        .status(200)
        .json({ success: true, message: "Data Deleted Successfully..." });
   
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong Please Try again Later...",
    });
  }
});

PORT = 4040;
app.listen(PORT, () => console.log(`Port Running On http://localhost:${PORT}`));
