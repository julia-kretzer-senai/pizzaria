const express = require('express')
const body = require('body-parser')
const sql = require('mysql2')
const { text } = require('body-parser')

const app = express()
const port = 3000

app.use(express.static(__dirname + '/'))
app.use(express.static('public'))

app.use(body.urlencoded({extended: false}))

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
    connection.query('insert into produto (nome, tipo, quantidade) values (?,?,?) ',
    [req.body.nomeProduto, req.body.tipoProduto, req.body.quantidade])
})

app.get('/pizza', (req,res) => {
    res.sendFile(__dirname + '/pizzas.html')
})

app.post('/pizza', (req,res) => {

    res.redirect('/cadastro')
})

app.get('/cadastro', (req,res) => {
    res.sendFile(__dirname + '/cadastro-cliente.html')
})

app.post('/cadastro', (req,res) => {
    connection.query('insert into cliente values (?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.cpf, req.body.nome, req.body.sobrenome, req.body.nascimento, req.body.cep, req.body.uf, 
    req.body.localidade, req.body.bairro, req.body.logradouro, req.body.num, req.body.complemento]);

    res.redirect('/finalizar')
})

app.post('/consultaPedido', (req,res) => {
    res.redirect('/consultarPedidos');

})


app.get('/consultarPedidos', (req,res) => {

    connection.query('select * from cliente', (err,results,fields) => {
        res.json(results)
        var tabela = ''
        tabela += `<table>`
        tabela += `<tr><td>cod_barras</td><td>nome</td><td>tipo</td><td>quantidade</td></tr>`
        for(var x in results) {
            tabela += `<tr><td>${results[x].cod_barras}</td><td>${results[x].nome}</td><td>${results[x].tipo}</td><td>${results[x].quantidade}</td></tr>`
        }
        tabela += `</table>`
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
