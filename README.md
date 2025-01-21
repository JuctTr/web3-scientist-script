# 开发环境搭建

## 安装编辑器

VSCode

## 安装nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

## 安装node 和 npm

```bash
nvm install node lts/iron
nvm use lts/iron # 切换node版本
nvm alias default lts/iron # 设置默认node版本
```

## 初始化项目

```bash
npm init -y
```

## hardhat

官网：https://hardhat.org/

GitHub：https://github.com/NomicFoundation/hardhat

Hardhat 是一个功能强大的以太坊开发环境，用于构建、部署、测试和调试智能合约。它是一个灵活的工具，专为开发者设计，可以帮助他们在以太坊上快速开发去中心化应用程序（DApps）。

Hardhat 可以理解为是一个**工具箱**，专门用来帮助开发者**快速开发、测试、调试和部署以太坊上的智能合约**

```bash
npm install --save-dev hardhat
```

### 安装插件

插件地址：https://hardhat.org/hardhat-runner/plugins

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

### 初始化hardhat环境

```bash
npx hardhat init
```



## ethers

官网：https://docs.ethers.org/v6/

Ethers.js 是一个 **轻量级的 JavaScript 库**，专门用来和以太坊网络交互，好比如你想写代码控制以太坊区块链，比如**查询账户余额、发送交易、调用智能合约**等



## RPC 服务 API

### 什么是RPC?

RPC（Remote Procedure Call，远程过程调用）服务是一种允许程序调用远程服务器上的函数或过程的技术，就像调用本地函数一样。它简化了分布式系统中不同节点间的通信。

### Alchemy和Infura

Alchemy 和 Infura 都是区块链开发者常用的 **区块链节点服务平台**，它们的核心功能类似：提供稳定的 RPC 接口，让开发者可以与以太坊或其他区块链网络交互

比如：用 Alchemy 连接以太坊网络，查询某个账户的余额



### 配置 .env 中隐私环境变量

在仓库新建.env文件，把Alchemy或Infura官网的key，填入

```bash
# .env.example

ALCHEMY_KEY=
INFURA_KEY=

PRIVATE_KEY_0=
PRIVATE_KEY_1=
```





## Contract ABI 

Contract ABI 是开发者和智能合约之间的“沟通桥梁”，它将合约的功能结构化描述，让外部程序能够正确调用和解析合约的功能。通过它，我们能轻松与区块链上的智能合约交互，而不需要直接操作底层的复杂**二进制数据**。



# 钱包基础















