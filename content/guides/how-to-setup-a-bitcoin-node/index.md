---
title: How to Setup a Bitcoin Node
templateKey: guide-post
type: node-setup
date: "2021-01-07T22:12:03.284Z"
dateModified: "2021-01-07T22:12:03.284Z"
excerpt: This is the first step when getting started with Bitcoin. Setup your own node to begin interacting with the network.
description: Tutorial on how to setup, configure, and run a bitcoin core node. Explains details needed to get started on the bitcoin network.
tags:
  - Node Setup
  - Bitcoin
featuredImage: ./006-online money.png
twitterImage: ./twitter_image.jpg
---

**Bitcoin Core** is an application that can be run on **Windows**, **Mac**, and **Linux**.

The application itself is <20 mb, however additional block data _will need to be downloaded_ to run a node.

## Install

*Download* and *install* **Bitcoin** from [bitcoin.org](https://bitcoin.org/en/download).

Installing Bitcoin won't begin downloading block data. You will need to start the application first, which we will do shortly.

## Node Options

Before starting Bitcoin Core, decide whether you want to use **mainnet** or **testnet** and if you want to run a **full** or **pruned** node.

| Node Type           | Size Requirements | Approximate Sync Time |
| :------------------ | :---------------- | :-------------------- |
| Full Mainnet Node   | **`>320 gb`**       | 3-5 days              |
| Full Testnet Node   | **`~30 gb`**    | Less than 1 day       |
| Pruned Mainnet Node | **`>577 mb`**    | 3-5 days              |
| Pruned Testnet Node | **`>577 mb`**    | Less than 1 day       |
| Regtest Node        | **`<100 mb`**  | Immediately           |

### Mainnet, Testnet, or Regtest

**Mainnet** (default) is the actual bitcoin network. This option takes the longest to sync, and requires at least **320 gb** to store the full blockchain.

**Testnet** is the bitcoin test network. **tBTC** have no value and can be acquired from various [testnet faucets](https://testnet-faucet.mempool.co/) for free. The current testnet blockchain is around **30gb** in size. The testnet blockchain mines blocks faster and occasionally resets (currently on the 3rd blockchain).

**Regtest** (regression testing) allows the user to start from the first block on a new local test blockchain. Blocks can be generated with the **generate** command.

Learn more about [Mainnet, Testnet, and Regtest](http://localhost:8000/mainnet-testnet-and-regtest-modes/) modes.

### Full or Pruned Node
By default, bitcoin will download and store every block in the blockchain on your computer. If you *don't have enough* storage space for a **full node**, use the **prune** setting. This will allow you to specify how much storage space to allow for blocks, and bitcoin will automatically delete blocks older than that amount.  

Learn more about [Full vs Pruned Bitcoin Nodes](http://localhost:8000/mainnet-testnet-and-regtest-modes/).


## Configuring Bitcoin Core

Unless you want to run bitcoin with the default settings, create a `bitcoin.conf` file in your recently installed `Bitcoin/` folder where you can specify various options.  
<br />
Each **configuration option**, on it's own line, is a *property name* set equal to *a value*. There are default values already set for many options.  

Using a **#** sign at the start of a line indicates that line is a **comment**, which won't be included in the configuration.  

Here is an example `bitcoin.conf` file with some common configuration options:

<div class="filename">bitcoin.conf</div>

```bash
prune=5500
# Sets pruned mode, amount in MiB (minimum is 5500 or ~577mb)

testnet=1
# Starts Node in testnet (default is 0)

regtest=0
# Starts Node in regtest (default is 0)

txindex=1
# Indexes all transactions on the blockchain (default is 0)  
```

The most important options to consider when first setting up a node are: whether you want to use **testnet** or **regtest** mode instead of mainnet, if you want to **prune** your blockchain instead of store all blocks, and whether you want to index transactions with **txindex**.  

### Transaction Indexing

If you want to be able to lookup any transaction on testnet or mainnet, make sure to include the `txindex=1` option so that Bitcoin Core indexes your transactions as you download them. Otherwise, you will only be able to view transactions pertinent to your wallet and mempool transactions.  
<br />
Transaction indexing can take up *approximately 10%* of the blockchain size additionally but is useful for developing applications like a block explorer.

## Starting Bitcoin

There are two options for running bitcoin core: **bitcoind** (the daemon) or **bitcoin-qt** (the wallet GUI).  
<br />
If you are new to Bitcoin Core, the GUI is a great option to get familiar with the software. The daemon is useful for building applications and using the CLI for commands.  
<br />
For both options we will be specifying the `datadir` startup command to our `Bitcoin` directory. This will ensure our blocks are stored in the right folder and our correct configuration is used. Feel free to omit this option if you're running a full mainnet node and don't care where your blocks get stored.

### Bitcoin-qt

To open the **wallet GUI**, enter the following command from your `Bitcoin` folder in the terminal

```bash
bitcoin-qt -datadir=C:\Bitcoin
```

This will start Bitcoin QT using the `bitcoin.conf` in your `Bitcoin/` folder.

### Bitcoind

To start the **daemon**, enter the following command from your `Bitcoin/daemon` folder in the terminal

```bash
bitcoind -datadir=C:\Bitcoin
```

This will start the daemon using the `bitcoin.conf` in your `Bitcoin/` folder.

Bitcoin will automatically start downloading blocks based on which configuration you specified.

## Syncing the Blockchain

If this is your first time starting Bitcoin Core, your node will need to download and verify all of the blocks. This can take *several hours* on **testnet** and a *few days* on **mainnet**. If you decide to run a pruned node, your software will still need to download and verify all the same data. A pruned node will discard any older blocks past the specified size (577 mb in the example).  

Once the blockchain is synced, you are successfully running a node on the bitcoin network!