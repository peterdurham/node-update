---
title: Home Preview Content
slug: home-preview
templateKey: page
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
---

<h2 id="bitcoin-core-setup">Bitcoin Core Setup</h2>

**Bitcoin** is a P2P computer application for **Windows**, **Mac**, and **Linux** that can be downloaded from [bitcoin.org](https://bitcoin.org/en/download).

Once installed, you will need to download and verify *the entire blockchain*. **Full nodes** (default) store all historical block data on your device while **pruned nodes** verify then delete older data to save space.  

**Mainnet** (default) allows you to use the actual bitcoin network and blockchain. **Testnet** is a smaller, separate blockchain for test transactions using worthless **tBTC**.

Here is a table of 5 configuration options when running a node:


| Node Type           | Size Requirements | Approximate Sync Time |
| :------------------ | :---------------- | :-------------------- |
| Full Mainnet Node   | **`>320 gb`**       | 3-5 days              |
| Full Testnet Node   | **`~30 gb`**    | Less than 1 day       |
| Pruned Mainnet Node | **`>577 mb`**    | 3-5 days              |
| Pruned Testnet Node | **`>577 mb`**    | Less than 1 day       |
| Regtest Node        | **`<100 mb`**  | Immediately           |

All options can store UTXOs, send, and receive transactions.  

⮡ &nbsp;[Learn how to setup up a Bitcoin node](/how-to-setup-a-bitcoin-node/)


<h2 id="configuration">Configuration</h2>

Bitcoin Core can be configured by using a `bitcoin.conf` text file, or by adding configuration flags at startup.  

Some configuration options include:

- **Mode**: Mainnet (default), Testnet, or Regtest
- **Prune Amount**: Maximum block size to store
- **Server**: Allow node to listen for API requests
- **Transaction Indexing**: Store transaction indexes for complete blockchain lookup
- **RPC Login Info**: Credentials to access node from a server
- **Listen**: Serve blocks to other users

An example `bitcoin.conf` file might look like this:

```bash
mainnet=1
server=1
prune=5500
rpcuser=myusername
rpcpassword=mypassword
```

Another way apply the same configurations would be to start the node using the same options and a hyphen in front of each:
```bash
bitcoind -mainnet=1 -server=1 -prune=5500 -rpcuser=myusername -rpcpassword=mypassword
```

⮡ &nbsp;[Learn about Bitcoin Configuration](/how-to-configure-bitcoin-core/)  

⮡ &nbsp;[View Bitcoin Config Reference](/bitcoin-config/)

<h2 id="console-commands">Console Commands</h2>

**Bitcoin** allows you to perform *dozens of commands* including:
- Getting block/transaction information
- Getting network/mining data
- Tracking UTXOs
- Creating addresses
- Sending transactions

Commands can be performed in the **Bitcoin-qt** console
```bash
>> getblockcount
664,029
```
Commands can also be done with the **bitcoin-cli** if a node is running
```bash
$ bitcoin-cli getblockcount
664,029
```
Commands can also be done using the **RPC API** remotely with HTTP requests.

```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

<!-- ⮡ &nbsp;[Learn about Bitcoin Console Commands](/how-to-use-the-bitcoin-console/)    -->

⮡ &nbsp;[View RPC Commands Reference](/rpc-commands/)


<h2 id="rpc-server">RPC Server</h2>

Bitcoin commands can be called with *user-created* or *third-party* applications using the **JSON RPC API**. This allows the user to perform HTTP requests directly to their node.  

For example, here is how you would get the **Best block hash** using the JSON RPC API with curl:

```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbestblockhash", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

It is possible to build applications that interact with this API using any of these languages:  

**Python**, **Ruby**, **Erlang**, **PHP**, **Java**, **Perl**, **Go**, **.NET (C#)**, **Node.js**, **Deno**, **Clojure**, **C**, **C++**, and more.  

Building an RPC Server will allow you to create any applications you like on top of your bitcoin node. 

<!-- ⮡ &nbsp;[Learn how to build a Bitcoin RPC Server with Node.js](/how-to-build-a-bitcoin-rpc-server/) -->

Tutorial for setting up a bitcoin RPC server coming soon!

<h2 id="building-applications">Building Applications</h2>

Once you have a Bitcoin node and RPC Server setup, you can create applications and user interfaces.  

Bitcoin is incredibly fast and the API is extensive. This allows the developer to create all sorts of applications including:
- dashboards 
- wallets
- block explorers
- payment processors
- much more

This site retrieves Bitcoin Network statistics from a regularly updated, cloud hosted mainnet node.  

More development tutorials **coming soon**!

<!-- #### Node.js + React.js Tutorials: -->

<!-- ⮡ [Learn how to build a statistics dashboard](/)   -->

<!-- ⮡ [Learn how to build a bitcoin wallet](/)   -->

<!-- ⮡ [Learn how to build a block explorer](/) -->