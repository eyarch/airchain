// server.js

const express = require('express');
let app = express();
const PORT = 3000;

//Defaults 7545 for Ganache , 8545 for testrpc/Ganache-cli
var providerLocation='http://localhost:7545';


const Web3 = require('web3');
let web3 = new Web3();


web3.setProvider(new Web3.providers.HttpProvider(providerLocation));

app.use(express.static('public')); //public folder for static content

app.get('/', function(req, res){
    res.sendFile('index.html');
 });
 

// localhost:3000/blockchain
app.get('/blockchain', function(req,res){
   web3.eth.getAccounts(function(err, accounts){
      if(err == null) res.send(JSON.stringify(accounts));
   });
});

// Rest API for endpoint localhost:3000/transaction
app.get('/transaction', function(req,res){
    var obj = web3.eth.getBlockTransactionCount("latest")
.then(console.log);
    //var transaction = web3.eth.getTransactionFromBlock('latest').then(console.log);
    //res.send(JSON.stringify(transaction));  
    res.send(JSON.stringify(obj)); 

});


 

app.listen(PORT, function(){
   console.log('Server is started on port:',PORT);
});
