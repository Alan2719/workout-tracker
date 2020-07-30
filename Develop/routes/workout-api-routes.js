var db = require("../models");
//const mongojs = require("mongojs");

module.exports = function(app) {
    app.post("/api/exercise/",({body},res) => {
        //let exerciseId =  mongojs.ObjectId(req.params.id);
        db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/api/exercise/",(req,res) => {
        db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.put("/api/exercise/:id",(req,res) => {
        let id = req.params.id;
        db.Workout.updateOne(
            {
                _id: id
            },
            {
                $set: {
                   exercise: req.body
                }
            },
            (err,data)=> {
                if (err) {
                    res.send(err);
                } else {
                    res.json(data);
                }
            })
    });
};