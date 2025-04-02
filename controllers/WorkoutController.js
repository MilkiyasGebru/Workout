const Workout = require('../models/WorkoutModel');
const mongoose = require("mongoose");

async function create_workout(req,res){
    const {title, load, reps} = req.body;

    try {
        const workout = await Workout.create({title:title, load:load, reps:reps});
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }

}

async function get_all_workouts(req,res){

    const workouts = await Workout.find({})
    res.status(200).json(workouts)

}

async function get_workout_by_id(req,res){
    const {id} = req.params
    try {
        const workout = await Workout.findById(id)

        if (!workout) {
            return res.status(404).json({message:'Workout not found.'})
        }

        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function delete_workout_by_id(req,res){
    const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message:'Invalid id of workout'})
        }

        const workout = await Workout.findByIdAndDelete(id)

        if (!workout) {
            return res.status(404).json({message:'Workout not found.'})
        }

        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }

}

async function update_workout(req,res){
    const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message:'Invalid id of workout'})
        }

        const workout = await Workout.findByIdAndUpdate(id, {...req.body})

        if (!workout) {
            return res.status(404).json({message:'Workout not found.'})
        }

        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    create_workout,
    get_all_workouts,
    get_workout_by_id,
    delete_workout_by_id,
    update_workout
}