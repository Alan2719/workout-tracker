var db = require("../models");
//const mongojs = require("mongojs");

module.exports = function(app) {
    app.post("/api/workouts/",({body},res) => {
        console.log("BODY",body);
        //let exerciseId =  mongojs.ObjectId(req.params.id);
        db.Exercise.create(body.exercise)
        .then(dbExercise => {
            console.log(dbExercise._id);
            console.log(body.workoutId);
            db.Workout.findByIdAndUpdate(body.workoutId,{
                $push: {exercises: "HOLA"}
                //test:"HOLA"
            },{new: true}).then(dbWorkout => {
                console.log("WORKOUT", dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/",(req,res) => {
        db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.put("/api/workouts/:id",(req,res) => {
        let id = req.params.id;
        console.log(id);
        db.Workout.updateOne(
            {
                _id: id
            },
            {
                $set: { exercise: req.body},
            },
            {
                new: true
            }
        ,(err,data)=> {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
        /*db.Workout.findOneAndUpdate({},
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
            });*/
    });
};