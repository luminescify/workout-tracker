const db = require('../models');
const app = require('express').Router();

// Get all workouts
app.get('/workouts', async (req, res) => {
    await db.Workout.aggregate([{
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" } ,
        }
      }])
      .sort({
          day: -1
      })
      .then(findWorkout => {
        res.json(findWorkout)
      }) .catch(err => {
          res.json(err);
      })
});

//Add an exercise
app.put('/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body }})
         .then(putWorkout => {
             res.json(putWorkout);
         }) .catch(err => {
             res.json(err);
         });
});

// Create a workout
app.post('/workouts', ({ body }, res) => {
    db.Workout.create(body).then((postWorkout => {
        res.json(postWorkout);
    })) .catch(err => {
        res.json(err);
    });
});

// Pull workouts in range
app.get('/workouts/range', async (req, res) => {
    await db.Workout.aggregate([{
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" } ,
        }
      }])
      .sort({
          day: -1
      })
      .limit(10)
      .then(findWorkout => {
        res.json(findWorkout)
      }) .catch(err => {
          res.json(err);
      })
});

module.exports = app;