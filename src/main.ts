// LIVE SERVER é do FRONT-END
// QUEM É O LIVE SERVER DO BACK-END?

// 1 - Para construir um servidor back-end e responder
// Vamos utilizar o EXPRESS
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
//Criar um objeto do tipo express.
const app = express()
//incluir pra ele receber json
app.use(express.json())  //Middleware
//incluir o CORS -> QUANDO A GENTE TEM OUTRA PORTA FAZENDO REQUISIÇÃO PARA A PORTA DO SERVIDOR
app.use(cors())
//ROTAS
app.get("/produtos",async(req,res)=>{

    //O que eu tenho que fazer aqui dentro?
    //OK -> PASSO 1: Criar o banco de dados
    //PASSO 2: Usar a lib mysql2 para conectar com o banco
    try{
        const conexao = await mysql.createConnection({
            host: process.env.dbhost?process.env.dbhost:"localhost",
            user: process.env.dbuser?process.env.dbuser:"root",
            password: process.env.dbpasswor?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022b",
            port: process.env.dbport?parseInt(process.env.dbport):3306
        })
        //PASSO 3: QUERY  -> SELECT * FROM produtos
        const [result,fields]  = await conexao.query("SELECT * FROM produtos")
        //PASSO 4: Colocar os dados do banco no response
        res.send(result)
    }catch(e){
        res.status(500).send("Erro do servidor")
    }
    
    
})


//INICIAR O SERVIDOR
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
})