module.exports.iniciaChat = function(application, req, res) {
  var dadosForm = req.body;
 
  req.assert('apelido','O campo apelido é necessário!').notEmpty();
  req.assert('apelido','O apelido deve ter entre 3 a 15 caracteres!').len(3, 15);
  var errors = req.validationErrors();

  if(errors) {
    res.render('index', { validacao: errors });
    return;
  }
  
  // io = variável global criada no ./app.js
  application.get('io').emit(
    'msgParaCliente',
    { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat!' }
  );

  res.render('chat', { dadosForm: dadosForm });
}