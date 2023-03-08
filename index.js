require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { db } = require('./DB/connection');


//Middleware
const app = express()
db();
app.use(cors());
app.use(express.json()); 

// Libraray
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUser, getRoomUsers } = require("./entity");

// Instances
const server = http.createServer(app);
const io = socketio(server,{cors: { origin: 'https://cpm-app-489603.netlify.app' }})


// Socket
io.on('connect',(socket) => {
  socket.on('join',({user,room},callback) => {
    console.log(user,room)
      const {response , error} = addUser({id: socket.id , user:user, room: room})
      console.log(response)
      if(error) {
        callback(error)
        return;
      }
      socket.join(response.room);
      socket.emit('message', { user: 'admin' , text: `Welcome ${response.user} ` });
      socket.broadcast.to(response.room).emit('message', { user: 'admin', text : `${response.user} has joined` })

      io.to(response.room).emit('roomMembers', getRoomUsers(response.room))
  })

  socket.on('sendMessage',(message,callback) => {
    
      const user = getUser(socket.id)

      io.to(user.room).emit('message',{ user: user.user, text : message })

      callback()
  })
  
  socket.on('disconnect',() => {
    console.log("User disconnected");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message',{ user: 'admin', text : `${user.user} has left` })
    }
  })
})

//Importing the Routes
const generalRoutes=require('./Routes/employee.route');
const authRoutes=require('./Routes/auth.route');
const leadsRoutes = require('./Routes/leads.router')
const paymentRoutes = require('./Routes/paymentRoute')


app.get('/',(req,res)=>{
    res.status(200).send("Hello World")
})

//Adding custom middleware
app.use('/api',authRoutes);
app.use('/api',generalRoutes);
app.use('/api',paymentRoutes);
app.use('/api',leadsRoutes);

//PORT
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`App is listening in  port ${PORT}`);
});
