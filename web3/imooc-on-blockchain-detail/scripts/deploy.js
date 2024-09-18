//部署合约到ropsten测试环境

const path = require('path')
const Web3 = require('web3')
const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require('fs')

const contractPath = path.resolve(__dirname, '../src/compiled/CourseList.json')
const { interface, bytecode } = require(contractPath)

// const provider = new HDWalletProvider('shoe nut spy clap squeeze artefact sunny gorilla awake milk away lawsuit',
//     'https://ropsten.infura.io/v3/4596285aa3b54016aec5caa075fd0976')
const provider = new HDWalletProvider('general venue bunker beef suspect target mass solution badge orange please improve',
        'https://sepolia.infura.io/v3/3090914428a041b091d679984ac43f8a')


// const web3 = new Web3(provider);//由于紧接自执行函数，必须加分号，否则出错TypeError: (intermediate value) is not a function
const web3 = new Web3("http://127.0.0.1:8545");//由于紧接自执行函数，必须加分号，否则出错TypeError: (intermediate value) is not a function

(async () => {
    console.log('自执行')
    const accounts = await web3.eth.getAccounts()
    console.log('合约部署的账号' + accounts)
       // 检查账户余额
    const balance = await web3.eth.getBalance(accounts[0])
    const balanceEth = web3.utils.fromWei(balance, 'ether')
    console.log(`账户余额: ${balanceEth} ETH`)

    if (parseFloat(balanceEth) < 0.1) {  // 假设需要至少 0.1 ETH
        console.log('警告：账户余额可能不足以部署合约')
        return  // 如果余额太低，可以在这里终止脚本
    }
    console.time('合约部署消耗时间')
    const reslut = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({
            from: accounts[0],
            gas: '3000000'
        })
        .on('transactionHash', (hash) => {
            console.log(`交易哈希: ${hash}`);
            console.log('等待交易被确认...');
        })
        .on('receipt', (receipt) => {
            console.log(`合约已部署，地址: ${receipt.contractAddress}`);
        });

    console.timeEnd('合约部署消耗时间')
    console.log(reslut.options.address)
    const contractAddress = reslut.options.address
    console.log('合约部署成功' ,contractAddress)
    console.log('合约查看地址',`https://sepolia.etherscan.io/address/${contractAddress}`)

    const addressFile = path.resolve(__dirname,'../src/address.js')
    fs.writeFileSync(addressFile,"export default " + JSON.stringify(contractAddress))
    console.log("地址写入成功", addressFile)
})()