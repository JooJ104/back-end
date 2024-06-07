const express = require('express');
const bodyParser = require('body-parser'); 
const mysql = require ('mysql2');
const { error } = require('console');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'jooj',
    password: 'sabelinda',
    database: 'Biblioteca'
});

db.connect((error)=>{
    if (error){
        console.log("Erro ao conectar com o Banco de Dados")
    } else {
        console.log("Conectado ao MySQL")
    }
});

app.use(bodyParser.urlencoded({extended:true}))


app.get("/", (req, res) =>{
    res.sendFile(__dirname+'/login.html')
})
app.get("/cadastro", (req, res) =>{
  res.sendFile(__dirname+'/cadastro.html')
})

app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
  
    db.query('SELECT senha FROM user WHERE nome = ?', [nome], (error, results) => {
      if(error){
        res.status(500).send('Erro ao obter usuários.')
      } else {
        if(results.length > 0){ // Verifica se há resultados
          const user = results[0]; // Obtém o primeiro resultado
          if(user.senha === senha){
             res.send(`Login bem-sucedido! Bem-vindo, ${nome}.`);
          } else {
            res.status(401).send('Credenciais inválidas. Tente novamente.');
          }
        } else {
          res.status(401).send('Este usuário não existe.');
        }
      }
    })
  });

  

app.post('/cadastro', (req, res) => {
  const nome = req.body.nome
  const senha = req.body.senha
  const confirmarSenha = req.body.confirmarSenha

  if (senha === confirmarSenha ){
    db.query ('INSERT INTO user (nome, senha) VALUES (?, ?)', [nome, senha], (error, results) => {
      if (error) {
        res.send("Erro ao cadastrar.", error)
      } else {
        res.send(`Usuário ${nome} cadastrado com sucesso.`)
      }
   })
  } else {
    console.log("Senhas nao coincidem.")
  }
});

app.listen(port, () =>{
    console.log(`Servidor rodando no endereço: https://localhost:${port}`)
})

