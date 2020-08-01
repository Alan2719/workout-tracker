var db = require("../models");
const mongoose = require('mongoose');
//const mongojs = require("mongojs");

module.exports = function(app) {
    //Create a new workout
    app.post("/api/workouts",({body},res) => {
        db.Workout.create(body)
        .then(Workout => {
            res.json(Workout);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //Create a new exercise and insert it in the workout collection
    /*app.post("/api/workouts",({body},res) => {
        console.log("BODY",body);
        db.Exercise.create(body)
        .then(dbExercise => {
            console.log(dbExercise)
            console.log(dbExercise._id);
            console.log(body.workoutId);
            db.Workout.findByIdAndUpdate(body.workoutId,{
                $push: {exercises: body.exercise}
                //test:"HOLA"
            },{new: true}).then(dbWorkout => {
                console.log("WORKOUT", dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
            res.json(dbExercise);
        })
        .catch(err => {
            res.json(err);
        });
    });*/

    //Get the workout information
    app.get("/api/workout",(req,res) => {
        //let id = mongoose.Types.ObjectId(req.params.id);
        db.Workout.find()
        .then(Workout => {
            //console.log(Workout);
            //console.log(typeof Workout[0]._id);
            res.json(Workout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    //Updte the exercise array 
    app.put("/api/workouts/:id",(req,res)=> {
        let id = mongoose.Types.ObjectId(req.params.id);
        console.log(id);
        //console.log(typeof id);
        console.log(req.body);
        db.Workout.findByIdAndUpdate(id, {$push: {exercises: req.body}}, {new: true, upsert: true})
        .then(Exercise => {
            console.log(Exercise);
            res.json(Exercise);
        })
        .catch(err => {
            res.json(err);
        })
    });

    /*app.put("/api/workouts/:id",(req,res) => {
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
        });*/
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
    //});
};