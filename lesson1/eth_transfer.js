const { ethers } = require("ethers")
require('dotenv').config()

// 以下这段是主网交易
// Ethereum
// const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_KEY}`)

// 以下这段是测试网交易
// Sepolia
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_KEY}`)

const privateKeys = [process.env.PRIVATE_KEY_0, process.env.PRIVATE_KEY_1]

// 钱包账户0
const signer0 = new ethers.Wallet(privateKeys[0], provider)
// 钱包账户1
const signer1 = new ethers.Wallet(privateKeys[1])

console.log(signer0.address)
console.log(signer1.address)

async function transferETH(signer, amount, toAddress) {
    const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount.toString())
    });
    console.log("tx => ", tx)
    const receipt = await tx.wait()
    console.log("receipt => ", receipt)
}

async function main() {
    let blockNumber = await provider.getBlockNumber()
    console.log("current block number:", blockNumber)
    let balance0 = await provider.getBalance(signer0.address)
    console.log("signer0 ETH balance:", ethers.formatEther(balance0))
    let nonce0 = await provider.getTransactionCount(signer0.address)
    console.log("signer0 next nonce:", nonce0)
    let balance1 = await provider.getBalance(signer1.address)
    console.log("signer1 ETH balance:", ethers.formatEther(balance1))
    
    console.log("transferring ETH...")
    await transferETH(signer0, 0.001, signer1.address)

    console.log(`signer0 ETH balance: ${ethers.formatEther(await provider.getBalance(signer0.address))}`)
    console.log(`signer1 ETH balance: ${ethers.formatEther(await provider.getBalance(signer1.address))}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});



/**
 * 这个文件是一个使用 ethers.js 库进行以太坊转账的脚本。它主要做了以下几件事：
 * 1、引入 ethers.js 库和 dotenv 库，用于加载环境变量。
 * 2、根据注释选择连接到以太坊主网或 Sepolia 测试网的 JSON-RPC 提供者。
 * 3、从环境变量中获取两个私钥，并创建两个钱包账户 signer0 和 signer1。
 * 4、打印两个钱包账户的地址。
 * 5、定义了一个异步函数 transferETH，用于从指定的 signer 向 toAddress 转账指定数量的 ETH。
 * 6、定义了一个异步函数 main，在其中：
 *      获取并打印当前区块号。
 *      获取并打印 signer0 和 signer1 的 ETH 余额。
 *      获取并打印 signer0 的下一个交易计数（nonce）。
 *      调用 transferETH 函数，从 signer0 向 signer1 转账 0.001 ETH。
 *      再次获取并打印 signer0 和 signer1 的 ETH 余额。
 *      调用 main 函数，并在捕获到错误时打印错误信息并设置进程退出码。
 * 7、调用 main 函数，并在捕获到错误时打印错误信息并设置进程退出码。
 */