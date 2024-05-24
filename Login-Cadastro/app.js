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
    database: 'Organelas'
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
    const { username, password } = req.body;
  
    db.query('SELECT password FROM user WHERE username = ?', [username], (error, results) => {
      if(error){
        res.status(500).send('Erro ao obter usuários.')
      } else {
        if(results.length > 0){ // Verifica se há resultados
          const user = results[0]; // Obtém o primeiro resultado
          if(user.password === password){
             res.send(`Login bem-sucedido! Bem-vindo, ${username}.`);
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
  const username = req.body.username
  const password = req.body.password
  const passwordconfirm = req.body.passwordconfirm

  if (password === passwordconfirm ){
    db.query ('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (error, results) => {
      if (error) {
        res.send("Erro ao cadastrar.", error)
      } else {
        res.send(`Usuário ${username} cadastrado com sucesso.`)
      }
   })
  } else {
    console.log("Senhas nao coincidem.")
  }
});

app.listen(port, () =>{
    console.log(`Servidor rodando no endereço: https://localhost:${port}`)
})

