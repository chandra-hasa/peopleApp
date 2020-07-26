//importing express and creating app object
const express = require("express");
const app = express();
//db imported
const dbConnection = require("./config/db");

//calling db connection
dbConnection();

//middle ware to access the body
app.use(express.json({ extended: false }));

//use to import all routes
app.use("/api/persons", require("./routes/person"));

/*get or post request test to web page...
app.get("/", (req, res) => {
  res.send("Page loaded at local host");
});*/

//port configure and checcking connection..
const port = 5001;
app.listen(port, () => console.log("server connection successful"));
