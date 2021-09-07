const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://user1:player1@cluster0.432cc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true })
    .then(console.log("CONNECTED"))
    .catch((error) => console.log(error))