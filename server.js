require('dotenv').config();

const express = require('express');
const cors = require('cors');


const database = require('./database');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user_routes');


// Initialize Express App
const app = express();


// Added a middleware to handle the request body properly
app.use(express.json());

// Added the cors to allow all different origins to access the workout routes
app.use('/api/workouts', cors(), workoutRoutes);
app.use('/api/users', userRoutes);


// Connect to database
database()
    .then(()=>{
        //Listen for requests
        app.listen(process.env.PORT || 4000,()=>{
            console.log("Server is listening on port 4000!!")
        })
    })
    .catch((err)=>{console.log(err)})





