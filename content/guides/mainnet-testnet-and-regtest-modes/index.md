---
title: Mainnet, Testnet, and Regtest Bitcoin Modes
templateKey: guide-post
type: node-setup
date: 2021-01-09
dateModified: 2021-01-09
excerpt: "Bitcoin Core has three network types: Mainnet, Testnet, and Regtest."
description: Learn the difference between bitcoin mainnet, testnet, and regtest networks. Find out which network type you want to run a node on.
tags:
  - Network Options
  - Configuration
featuredImage: ./002-blockchain.png
twitterImage: ./twitter_image.jpg
---

There are 3 modes you can run **Bitcoin Core** with, and they all use different block data.

| Option   | Description                        | Min Size            | RPC Port|
| :----------- | :--------------------------------------- | :----|  :----|
| Mainnet        | Interact with the Bitcoin Network |  `320gb` | 8332|
| Testnet        | Interact with Bitcoin Test Network | `30gb` | 18332|
| Regtest      | Start blockchain from beginning locally | `<1 gb` | 18443| 

The mode you haved selected on startup (*mainnet by default*) will determine which blocks your bitcoin client will attempt to download.

## Mainnet
**Mainnet** is the *actual bitcoin network*. Running a mainnet node will download every historical bitcoin transaction and allow you to send and receive real bitcoin transactions.  
<br />
If you don't have enough space for the entire blockchain, **pruned mode** can reduce your block storage requirements to 577mb or less.  
<br />
Bitcoin nodes run on mainnet by default, so you will not need to include any additional configuration options.

## Testnet
**Testnet**, or the test network is a way to experiment with the Bitcoin software without using real money. Testnet bitcoins can be easily acquired through bitcoin [testnet faucets](https://testnet-faucet.mempool.co/).  
<br />
The test network occasionally gets reset and the size is considerably smaller than the full mainnet blockchain. It is useful for practicing with the wallet software and building applications.  
<br />
To use Bitcoin in testnet mode, specify `testnet=1` in your **bitcoin.conf** file, or include it as a command line flag.

## Regtest
This mode allows you to start a blockchain from the beginning and "mine" blocks indidually with the command line. This is useful for testing applications, and let's you confirm transactions immediately if you don't want to wait for testnet blocks.  
<br />
To use Bitcoin in regtest mode, specify `regtest=1` in your **bitcoin.conf** file, or include it as a command line flag.

You can mine new blocks with the **generatetoaddress** command providing the number of blocks and address to generate test coins to like so

```bash
generatetoaddress 5 "mpUwxqp9h8U2WzeXX2rQGXtFiQ85m9ET36"
```

