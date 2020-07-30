const path = require("path");

module.exports = function (app) {
    app.get("/exercise",(req,res)=>{
        res.sendFile(path.join(__dirname,"/../public/exercise.html"))
    });
    
    app.get("/stats",(req,res)=>{
        res.sendFile(path.join(__dirname,"/../public/stats.html"))
    });

    app.use((req,res)=>{
        res.sendFile(path.join(__dirname,"/../public/index.html"));
        //console.log(path.join(__dirname,"./frontend/index.html"));
    });
};