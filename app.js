const express = require("express");
const bodyParser = require("body-parser");
const contactRouter = require("./routes/contactRouter");
const accountRouter = require("./routes/accountRouter");
const transferRouter = require("./routes/transferRouter");
const locationRouter = require("./routes/locationRouter");
const productRouter = require("./routes/productRouter");
const hrRouter = require("./routes/hrRouter");  
const purchaseRouter = require("./routes/purchaseRouter");
const systemSettingRouter = require("./routes/systemSettingRouter.js")
const InventoryRouter = require("./routes/InventoryRouter.js") ;
const app = express();
const logger = require("morgan")


//  <-- setting the template engine  EJS -->
// app.set("view engine", "ejs");
// app.use(express.static('Business_ERP'));
// app.use(express.static('public'));


//    <-- Usnig Middlewares-->

app.use(express.static('images'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use("/api/v1" , contactRouter);  //  working
app.use("/api/v1", accountRouter);
app.use("/api/v1", transferRouter);
app.use("/api/v1", locationRouter);
app.use("/api/v1",productRouter);  // working 
app.use('/api/v1',hrRouter);
app.use("/api/v1",systemSettingRouter);
app.use("/api/v1" , InventoryRouter ) ;

app.get("/", (req, res) => {
   res.send("hello world")
});

module.exports = app;
