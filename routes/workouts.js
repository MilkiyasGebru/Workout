const express = require('express');

const router = express.Router();
const {
    create_workout,
    get_all_workouts,
    get_workout_by_id,
    delete_workout_by_id,
    update_workout} = require("./../controllers/WorkoutController")


// GET ALL WORKOUTS
router.get("/",get_all_workouts)


// GET A SINGLE WORKOUT BY ID
router.get("/:id",get_workout_by_id)


// POST A NEW WORKOUT
router.post("/",create_workout)


// DELETE A  WORKOUT
router.delete("/:id",delete_workout_by_id)


// UPDATE A  WORKOUT
router.patch("/:id",update_workout)





module.exports = router;