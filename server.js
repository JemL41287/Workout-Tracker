const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require ("path");

const Workout = require("./models/workoutModel");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


//HTML Routes//

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/exercise.html'))
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/stats.html'))
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//API Routes//

app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate({ _id: req.params.id }, { $push: {"exercises": req.body } }, (error, workoutById) => {
    if (error) {
      console.log(error);
    } else {
      res.json(workoutById);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  Workout.find({}, (error,range) => {
    if(error) {
      console.log(error);
    } else {
      res.json(range);
    }
  });
});

