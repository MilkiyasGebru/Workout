require('dotenv').config();

const express = require('express');
const cors = require('cors');


const database = require('./database');
const workoutRoutes = require('./routes/workouts');


// Initialize Express App
const app = express();


app.use(express.json());


app.use('/api/workouts', cors(), workoutRoutes);


// Connect to database
database()
    .then(()=>{
        //Listen for requests
        app.listen(process.env.PORT || 4000,()=>{
            console.log("Server is listening on port 4000!!")
        })
    })
    .catch((err)=>{console.log(err)})





