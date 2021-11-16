const db = require('../models');
const app = require('express').Router();

app.get('/api/workouts', (req, res) => {
    db.Workout.find({}).then(findWorkout => {
        findWorkout.forEach(workout => {
            let total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }) .catch(err => {
        res.json(err);
    });
});

app.put('/api/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {$inc: { totalDuration: req.body.duration },
         $push: { exercises: req.body }},
         { new: true }).then(putWorkout => {
             res.json(putWorkout);
         }) .catch(err => {
             res.json(err);
         });
});

app.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body).then((postWorkout => {
        res.json(postWorkout);
    })) .catch(err => {
        res.json(err);
    });
});

app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({}).then(getWorkouts => {
        console.log('All Workouts');
        res.json(getWorkouts);
    }) .catch(err => {
        res.json(err);
    });
});

module.exports = app;