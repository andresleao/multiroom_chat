// Importando as cinfigurações do servidor
var app = require('./config/server');

// Parametrizando a porta de escuta
var server = app.listen(3000, function() {
  console.log("Servidor ON");
});

// Requisições websockets
var io = require('socket.io').listen(server);

// criando uma variável global com o obj express utilizando set()
app.set('io', io);

// Criar conexão por websocket
io.on('connection', function(socket) {
  console.log('Usuário conectou!');

  socket.on('disconnect', function() {
    console.log('Usuário se desconectou!');
  });

  socket.on('msgParaServidor', function(data) {
    // Diálogo
    socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });
    socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });

    // Participantes
    if (parseInt(data.apelido_atualizado) == 0) {
      socket.emit('participantesParaCliente', { apelido: data.apelido });
      socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido });
    }
  });
});
