// server.js

const express = require('express');
let app = express();
const PORT = 3000;

//Defaults 7545 for Ganache , 8545 for testrpc/Ganache-cli
var providerLocation = 'http://localhost:8545';


const Web3 = require('web3');
let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider(providerLocation));

app.use(express.static('public')); //public folder for static content

app.get('/', function (req, res) {
    res.sendFile('index.html');
});


// localhost:3000/accounts
app.get('/accounts', function (req, res) {
    web3.eth.getAccounts(function (err, accounts) {
        if (err == null) res.json(accounts);
    });
});


// Rest API for endpoint localhost:3000/transaction
app.get('/txcount', function (req, res) {
    var obj = web3.eth.getBlockTransactionCount("latest")
        .then(console.log);
    res.send(JSON.stringify(obj));

});

// /block - REST API to get a block 
app.get('/block', function (req, res) {
    var blocknum = 0; // fetching block 0 for test 
    web3.eth.getBlock(blocknum, function (error, block) {
        if (!error) {
            res.json(block);
        } else {
            console.error(error);
        }
    });
});



app.listen(PORT, function () {
    console.log('Server is started on port:', PORT);
});
