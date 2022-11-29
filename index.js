const express = require('express')
const body = require('body-parser')
const sql = require('mysql2')

const app = express()
const port = 3000

app.use(express.static(__dirname + '/'))
app.use(express.static('public'))

app.use(body.json())
app.use(body.urlencoded({extended: true}))

const connection = sql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pizzariajulia',
    port: 3306
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/finalizar', (req,res) => {
    res.sendFile(__dirname + '/finalizar.html')
})

app.post('/pedido', (req,res) => {
    res.redirect('/pizza')
})

app.post('/produto', (req,res) => {
    res.redirect('/cadastroProduto')
})

app.get('/cadastroProduto', (req,res) => {
    res.sendFile(__dirname + '/cadastro-produtos.html')
    console.log(req.body)
})

app.post('/cadastroProduto', (req,res) => {
    console.log(req.body)
    connection.query('insert into produto (nome, tipo, quantidade) values (?,?,?)',
    [req.body.nomeProduto, req.body.tipoProduto, req.body.quantidade])
})

app.get('/pizza', (req,res) => {
    res.sendFile(__dirname + '/pizzas.html')
})

var tamanho, sabor1, sabor2, sabor3, sabor4 

app.post('/pizza', (req,res) => {
    console.log(req.body.tamanho, req.body.sabor1, req.body.sabor2, req.body.sabor3, req.body.sabor4)
    tamanho = req.body.tamanho
    sabor1 = req.body.sabor1
    sabor2 = req.body.sabor2
    sabor3 = req.body.sabor3
    sabor4 = req.body.sabor4 // funcionando
    res.redirect('/cadastro')
})


app.get('/cadastro', (req,res) => {
    res.sendFile(__dirname + '/cadastro-cliente.html')
})

app.post('/cadastro', (req,res) => {
    connection.query('insert into cliente values (?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.cpf, req.body.nome, req.body.sobrenome, req.body.nascimento, req.body.cep, req.body.uf, 
    req.body.localidade, req.body.bairro, req.body.logradouro, req.body.num, req.body.complemento]);

    console.log(tamanho, sabor1, sabor2, sabor3, sabor4) // funcionando, precisa inserir na tabela pedido o cpf do cliente junto com as variaveis da pizza
    res.redirect('/finalizar')
})

app.post('/consultaPedido', (req,res) => {
    res.redirect('/consultarPedidos');
})

app.get('/consultarPedidos', (req,res) => {

    connection.query('select * from cliente', (err,results,fields) => {
        res.json(results)
        })
})

app.post('/consultaProduto', (req,res) => {
    res.redirect('/consultarProdutos')
})

app.get('/consultarProdutos', (req,res) => {
    connection.query('select * from produto', (err,results,fields) => {
        res.json(results)
    })
})

app.listen(port, () => {
    console.log(`Peça já sua pizza na porta ${port}!`)
})
