const { ethers } = require("ethers");
require('dotenv').config()

// 以下这段是主网交易
// Ethereum 
// const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_KEY}`)


// 以下这段是测试网交易
// Sepolia
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_KEY}`)

const privateKeys = [process.env.PRIVATE_KEY_0, process.env.PRIVATE_KEY_1]

const signer0 = new ethers.Wallet(privateKeys[0]) // signer = wallet.connect(provider)
const signer1 = new ethers.Wallet(privateKeys[1], provider)


// 定义了 ERC20 代币的 ABI（应用二进制接口）。ABI 是一个 JSON 格式的数组，用于描述合约的方法和事件。
const ERC20ABI = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
    "function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)",
    "function approve(address _spender, uint256 _value) public returns (bool success)",
    "function allowance(address _owner, address _spender) public view returns (uint256 remaining)"
]

// UNI on Sepolia
const tokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"

// read-only methods, bounded to the provider
const token = new ethers.Contract(tokenAddress, ERC20ABI, provider)
// also state-changing methods, bounded to a signer
// const token = new ethers.Contract(tokenAddress, ERC20ABI, signer1)

async function transferERC20(token, amount, decimals, toAddress) {
    // convert read-only to also state-changing
    const tx = await token.connect(signer1).transfer(toAddress, ethers.parseUnits(amount.toString(), decimals))
    // const tx = await token.transfer(toAddress, ethers.parseUnits(amount.toString(), decimals))
    console.log("tx:", tx)
    const receipt = await tx.wait()
    console.log("receipt:", receipt)
}

async function main() {
    let name = await token.name()
    console.log("token name:", name)
    let symbol = await token.symbol()
    let decimals = await token.decimals()
    let balance0 = await token.balanceOf(signer0.address)
    console.log("signer0 %s balance:", symbol, ethers.formatUnits(balance0, decimals))
    let balance1 = await token.balanceOf(signer1.address)
    console.log("signer1 %s balance:", symbol, ethers.formatUnits(balance1, decimals))

    console.log("transferring ERC20...")
    await transferERC20(token, 0.0001, decimals, signer0.address)

    console.log(`signer0 ${symbol} balance: ${ethers.formatUnits(await token.balanceOf(signer0.address), decimals)}`)
    console.log(`signer1 ${symbol} balance: ${ethers.formatUnits(await token.balanceOf(signer1.address), decimals)}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});