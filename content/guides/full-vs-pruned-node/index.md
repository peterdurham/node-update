---
title: Full vs Pruned Bitcoin Node
templateKey: guide-post
type: node-setup
date: "2021-01-10T22:12:03.284Z"
dateModified: "2021-01-10T22:12:03.284Z"
excerpt: Do you have enough storage for a full node? Find out if you'll need to prune your node to save space.
description: Learn the difference between running a pruned and full bitcoin node. Prune your node to save storage space by deleting older blocks.
tags:
  - Node Setup
  - Full Node
  - Pruned Node
featuredImage: ./027-exchange.png
twitterImage: ./twitter_image.jpg
---

In order to use Bitcoin (on either **mainnet** or **testnet**), you will be required to download and verify all blocks on the blockchain.  

Using a **pruned node** allows you to *discard blocks* after a specified storage amount, while using a **full node** (default) will store every block on your computer.  


## When to use

### Pruned Node
If you want to run a Bitcoin node and don't have ~320gb available storage on your device, you will want to run a pruned node. All functionality for sending and receiving transactions will be the same, however previous block history will not be stored locally so you will not be able to verify all transactions.  
<br />
Pruned mode requires a minimum of 550 MiB (577 MB) storage and can be specified in the `bitcoin.conf` file with the line:

```bash
prune=550
```

### Full Node
If you have the available space on your device (~320gb) and want to be able to individually validate any incoming transaction, you will want to run a full node.  
<br />
Full nodes are even capable of sending block data to other nodes that request it, helping facilitate network decentralization.  
<br />
Bitcoin will download all mainnet block data by default and doesn't require additional configuration.
