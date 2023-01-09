const mongoose = require("mongoose");


exports.connectDatabase = () => {

    mongoose.set("debug", true);
    mongoose.set("strictQuery", false);


    mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/ERP_SITE",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
        .then(con => { console.log(`Database Connected: ${con.connection.host}`) })
        .catch((err) => console.log(err))
};

