const mongoose = require("mongoose");

// creating a database
mongoose.connect("mongodb://localhost:27017/MENfinal")
.then( () => console.log("connection successful------"))
.catch( (err) => console.log(err));