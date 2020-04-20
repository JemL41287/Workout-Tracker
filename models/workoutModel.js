const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true
            },
            name: {
                type: String,
                trim: true,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            distance: {
                type: Number,
                required: true
            }

        }
    ]

});

WorkoutSchema.methods.totalDuration = function(cb) {
    let sum = 0
    for (let i = 0; i < this.exercises.length; i++) {
        sum += this.exercises[i].duration;
    } 
    cb(sum);
} 

WorkoutSchema.methods.numExercises = function() {
    return this.exercises.length;
}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
