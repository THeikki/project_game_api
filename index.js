const express = require("express")
const app = express()
const port = process.env.PORT || 5000;

require("./db");

var cors = require("cors");
app.use(cors());
app.use(express.json());

const userRoute = require("./routes/users");

app.use("/api/users", userRoute);

app.get("/api/", (req, res) => {
  res.send("Project_game_api")

})

app.listen(port, () => console.log(`Server running in port ${port}`));