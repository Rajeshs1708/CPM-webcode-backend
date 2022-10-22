require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { db } = require('./DB/connection');

//Importing the Routes
const generalRoutes=require('./Routes/employee.route');
const authRoutes=require('./Routes/auth.route');
const leadsRoutes = require('./Routes/leads.router')


const app = express();
db();
app.use(cors()); // CORS - Cross Orgin Resource Sharing.Important protocol for making cross domain request possible.
app.use(express.json()); // Which is used to parse the input data to json format.


//Adding custom middleware
app.use('/api',authRoutes);
app.use('/api',generalRoutes);
app.use('/api',leadsRoutes);



//PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`App is listening in  port ${PORT}`);
});
