var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


var utilisateur = 1;
io.on('connection', function (socket) {
    console.log('Joueur'+ utilisateur+' s\'est connecté');
    io.emit("cookie",utilisateur);
    if(utilisateur === 1){
        utilisateur++;
    }

    socket.on("numerojoueur", function (poi){
        console.log(poi);
        
         io.emit("indicnumj", poi);
        //io.emit("")
        //io.emit("updateVote", data)
    })

    socket.on("vote", function (data){
        console.log(data);
        if (data === "pierre"){
         io.emit("findujeu", data);
        }
        socket.broadcast.emit("updateVote", data);
        //io.emit("")

        //io.emit("updateVote", data)
    })
    socket.on("login", function (data2){
        
        console.log(data2);
        io.emit("idincconnex", data2);
    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});