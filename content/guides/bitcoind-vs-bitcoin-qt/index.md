---
title: Bitcoind vs Bitcoin-qt
templateKey: guide-post
type: node-setup
date: 2021-01-11
dateModified: 2021-01-11
excerpt: Do you want to run your node as a command line daemon or a wallet GUI?
description: Learn the difference between running bitcoin core using bitcoind and bitcoin-qt. Startup a daemon or wallet GUI.
tags:
  - Bitcoind
  - Bitcoin-qt
featuredImage: ./031-Mining.png
twitterImage: ./twitter_image.jpg
---

Bitcoin Core has two options available for running a node: **bitcoind** and **bitcoin-qt**.  
<br />
These are both executable files that can be run to perform any bitcoin functionality such as looking up, sending, and receiving transactions.  
<br />
Bitcoind is a **daemon** or *command line tool*, while Bitcoin-qt is a user-friendly **wallet GUI**. Both options allow the node operator to use commands with the **bitcoin-cli** or programmatically with the **RPC API**. 

## Bitcoind

**Bitcoind** is a daemon tool and has no functionality besides the **bitcoin-cli** and **RPC API**.
### Node Startup
Bitcoind can be started with default settings by navigating to the `Bitcoin/daemon` folder and entering the command
```bash
bitcoind
```

### Using Options
Additional configuration options can be specified with flags such as
```bash
bitcoind -testnet=1 -txindex=1 -server=1
```
> These configuration options have a similar syntax to the `bitcoin.conf` file, except with a dash in front of them since they are declared via the command line.

## Bitcoin-qt
**Bitcoin-qt** is a wallet GUI (graphic user interface) which allows you to send and receive transactions, as well as enter commands using a console like the CLI.

### Node Startup
Bitcoind can be started with default settings by navigating to the `Bitcoin` folder and entering the command
```bash
bitcoin-qt
```
### Using Options
Additional configuration options can be specified with flags such as
```bash
bitcoin-qt -testnet=1 -txindex=1 -server=1
```


## Bitcoin-cli
When running a bitcoin node using either **bitcoind.exe** or **bitcoin-qt.exe**, the operator can perform Bitcoin commands from the `Bitcoin/daemon` folder such as

```bash
bitcoin-cli getblockcount
```
or
```bash
bitcoin-cli sendrawtransaction 9j23oj9jf0923jr
```