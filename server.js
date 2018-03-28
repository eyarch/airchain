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


// localhost:3000/accounts - get all accounts
app.get('/accounts', function (req, res) {
    web3.eth.getAccounts(function (err, accounts) {
        if (err == null) res.json(accounts);
    });
});

// get a specific transaction
// txn/0x0a41ec0ac9cbdb224ff5db91a90b030727788f9a3aebf191fc568aa4358582b5
app.get('/txn/:txhash', function (req, res) {
    web3.eth.getTransaction(req.params.txhash, function (err, txn) {
        if (err == null) res.json(txn);
    });
    
});

//
// Rest API for endpoint localhost:3000/transaction
app.get('/txcount', function (req, res) {
    var obj = web3.eth.getBlockTransactionCount("latest")
        .then(console.log);
    res.send(JSON.stringify(obj));

});

// /block - REST API to get a block  user /block/0 to get 0 block
app.get('/block/:blocknum', function (req, res) {
    web3.eth.getBlock(req.params.blocknum, function (error, block) {
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
