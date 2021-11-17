const db = require('../models');
const app = require('express').Router();

// Get all workouts
app.get('/api/workouts', (req, res) => {
    db.Workout.find({}).then(findWorkout => {
        findWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(findWorkout);
    }) .catch(err => {
        res.json(err);
    });
});

//Add an exercise
app.put('/api/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { totalDuration: req.body.duration },
          $push: { exercises: req.body }},
         { new: true }).then(putWorkout => {
             res.json(putWorkout);
         }) .catch(err => {
             res.json(err);
         });
});

// Create a workout
app.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body).then((postWorkout => {
        res.json(postWorkout);
    })) .catch(err => {
        res.json(err);
    });
});

// Pull workouts in range
app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({}).then(findWorkouts => {
        console.log('All Workouts');
        res.json(findWorkouts);
    }) .catch(err => {
        res.json(err);
    });
});

module.exports = app;