import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5001/', {
  reconnectionAttempts: 20
});

function sendMessage(message) {
  socket.emit('message', message);
}

function subscribeToMessages(cb) {
  socket.on('message', message => cb(message));
}

export { sendMessage, subscribeToMessages };