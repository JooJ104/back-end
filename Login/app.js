const express = require('express');
const bodyParser = require('body-parser'); 
const mysql = require ('mysql2')

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
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

app.post("/login", (req, res) =>{
    const username = req.body.usuario
    const password = req.body.senha
    
    db.query('SELECT password FROM user WHERE username = ? and password = ?', [username, password], (error, results) => {
        if (results.length > 0){
            const passwordBD = results[0].password;
            if (password === passwordBD){
                console.log(passwordBD)
                console.log("Beleza, entrou")
            } else if (password !== passwordBD)  {
                console.log('Senha incorreta')
            }
        }else{
            console.log('Usuário incorreto')
        }
    })
    
});

    


app.listen(port, () =>{
    console.log(`Servidor rodando no endereço: https://localhost:${port}`)
})