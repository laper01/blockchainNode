const SHA256 = require('crypto-js/sha256')


class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transaction, previousHash=''){
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce =0;
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+
            this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficulity){
        while(this.hash.substring(0,difficulity) !== Array(difficulity+1).join(0)){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("bloc mined " +this.hash)
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulity =2;
        this.pendingTransactions =[];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block('10/10/1994', "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }

    minePendingTransactions(minningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulity);

        console.log('Block successfully mined');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, minningRewardAddress, this.miningReward) 
        ]
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalnceOfAddress(address){
        let balance =0;


        for(const block of this.chain){
            for (const trans of block.transaction){
                if(trans.fromAddress === address){
                    balance -= transaction;
                }
                if (trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i =1; i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }
        }
        return true;
    }
}

let yusufCoin = new Blockchain();

yusufCoin.createTransaction(new Transaction('address1', 'address2', 100))
yusufCoin.createTransaction(new Transaction('address2', 'address1', 50))

console.log('\n Starting the minner ...')
yusufCoin.minePendingTransactions('yusuf-address');
console.log('\n yusuf balance is ', yusufCoin.getBalnceOfAddress('yusuf-address'))

console.log('\n Starting the minner again ...')
yusufCoin.minePendingTransactions('yusuf-address');
console.log('\n yusuf balance is ', yusufCoin.getBalnceOfAddress('yusuf-address'))