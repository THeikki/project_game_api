const express = require("express")
const app = express()
const port = process.env.PORT || 5000;

require("./db");

var cors = require("cors");
app.use(cors());
app.use(express.json());

//const contactRoute = require("./routes/contacts");

//app.use("/api/contacts", contactRoute);

app.get("/", (req, res) => {
  res.send("Project_game_api")

})

app.listen(port, () => console.log(`Server running in port ${port}`));