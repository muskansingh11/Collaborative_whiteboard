const express = require("express");
const app  = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
let connection = [];
io.on('connect',(socket)=>{
    connection.push(socket);
    console.log(`${socket.id} has connected`);

    socket.on("draw",(data)=>{
        connection.forEach((con)=>{
            if(con.id !== socket.id)
            {
                con.emit('ondraw',{x:data.x ,y:data.y})
            }
        })
    })
    socket.on('down',(data)=>{
        connection.forEach(con=>{
            if(con.id !== socket.id)
            {
                con.emit('ondown',{x:data.x,y:data.y});
            }
        })

    })
    socket.on('disconnect',(reason)=>{
        console.log(`${socket.id} is disconnected`);
        connection  = connection.filter((con) => con.id !== socket.id);
    
    });
});


app.use(express.static("public"));


let port = process.env.PORT||3000;

httpServer.listen(port,()=> console.log(`Listening on port ${port}`));