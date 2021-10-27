const express = require('express');
const path = require('path');
require("./db/conn");
const User = require("./models/usermessage")
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 8000;// environment variable

//setting the static path
const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

//routing
//app.get(path, callback)
app.get("/", (req,res) => {
    res.render("index");
})

app.post("/contact", async(req,res) => {
    try{
        //res.send(req.body);
        const userData = new User(req.body);
        userData.save();
        res.status(201).render("index");
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen( port, () => {
    console.log(`Server is running at the port number ${port}`);
})