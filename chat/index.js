const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('./'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('register', (user) => {
        users[socket.id] = user
        io.emit('userList', Object.values(users));
        socket.emit('message', {
            text: 'You have connected to the chat.',
            username: 'System',
            color: 'gray',
        });
        socket.broadcast.emit('message', {
            text: `${user.username} has joined the chat.`,
            username: 'System',
            color: 'gray',
        });
    });

    socket.on('message', (message) => {
        const user = users[socket.id];
        if (user) {
            io.emit('message', {
                text: message,
                username: user.username,
                color: user.color,
            });
        }
    });

    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            delete users[socket.id];
            io.emit('user-list', Object.values(users));
            socket.broadcast.emit('message', {
                text: `${user.username} has left the chat.`,
                username: 'System',
                color: 'gray',
            });
        }
    });
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
