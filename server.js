const express = require("express");
const app = express();
const port = process.env.PORT;
import 'dotenv/config'

app.use((req, res, next) => {
   console.log("1");
   next();
});
app.use((req, res, next) => {
    console.log("2");
    next();
 });

 app.use((req, res, next) => {
    const isAllowed = false;

    if(!isAllowed){
        return res.status(403).send("Stop");
    }
    next();
 });

 app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
 });

    app.get("/", (req, res) => {
     res.send("Genetal page")
 });

 app.get("/about", (req, res) => {
    res.send("Info for compani")
});



app.get("/user", (req, res) => {
    res.json({
        id:1,
        name: "Anna",
        role:"student"
    });
});

 app.get("/producrts", (req, res) => {
     res.send("Product ok!")
 });
 app.post("/producrts", (req, res) => {
    res.send("Product +!")
});
app.delete("/producrts", (req, res) => {
    res.send("Product -!")
});

app.listen(3000, () => {
    console.log("Server started on port 3000");

});