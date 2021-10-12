const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
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
    }
    createGenesisBlock(){
        return new Block(0, '10/10/1994', "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulity);
        this.chain.push(newBlock);
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
console.log('minning block 1... ')
yusufCoin.addBlock(new Block(1, "10/11/2021",{amount:4}));
console.log('minning block 2... ')
yusufCoin.addBlock(new Block(2, "12/11/2021",{amount:4}));



// console.log('is blockChain valid ? '+yusufCoin.isChainValid());

// yusufCoin.chain[1].data = {amount: 100}

// console.log('is blockChain valid ? '+yusufCoin.isChainValid());


// console.log(JSON.stringify(yusufCoin, null, 4));