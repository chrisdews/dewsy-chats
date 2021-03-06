const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);


app.get('/', function(req,res){
    res.send('<h1>hello world</h1>')
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      
    socket.on('chat message', (msg) => {
        console.log('message: ' + JSON.stringify(msg))
        io.emit('chat message', msg);
    })
    
  //   socket.on('end', function (){
  //     socket.disconnect(0);
  // });
  });


http.listen(3001, () => {console.log('listening on port 3001')})

