const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const {Blockchain, Transaction} = require('./blockchainOri');

const myKey = ec.keyFromPrivate('2bfcafffbd04f7a485fbc772cb7bbf00cc6aef9d579d6c8c52cd17858ee5c4cc')
const mayWalletAddress = myKey.getPublic('hex');

let yusufCoin = new Blockchain();

const tx1 = new Transaction(mayWalletAddress, 'addressToPulicKey', 10);
tx1.signTransaction(myKey);
yusufCoin.addTransaction(tx1);

console.log('\n yusuf balance is ', yusufCoin.getBalanceOfAddress(mayWalletAddress))

console.log('\n Starting the minner ...')
yusufCoin.minePendingTransactions(mayWalletAddress);


console.log('\n yusuf balance is ', yusufCoin.getBalanceOfAddress(mayWalletAddress))
console.log('is chain valid ?', yusufCoin.isChainValid())
