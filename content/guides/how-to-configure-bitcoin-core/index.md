---
title: How to Configure Bitcoin Core
templateKey: guide-post
type: node-setup
date: "2021-01-08T22:12:03.284Z"
dateModified: "2021-01-08T22:12:03.284Z"
excerpt: There are plenty of configuration options for Bitcoin Core. Find out which ones you might need.
description: Learn how to configure bitcoin core with the bitcoin.conf file and command line configuration flags.
tags:
  - Configuration
  - Node Setup
featuredImage: ./013-settings.png
twitterImage: ./twitter_image.jpg
---

Bitcoin core has a variety of **configuration options** available. Every configuration option either has a default value or is blank unless specified.

There are *two ways* to specify bitcoin configuration options: using a **bitcoin.conf** file, or including **configuration flags** in the startup command.  



To see all available config options, check out [Bitcoin Core Configuration Reference](http://localhost:8000/bitcoin-config)

## Option 1: Using a bitcoin.conf file

The first option is to create a `bitcoin.conf` file in the `Bitcoin/` folder you installed with. This is a basic text file with configuration options on each line. Comment lines begin with a **#** and aren't include in the configuration.

Here is an example `bitcoin.conf` file with some common configuration options:

<div class="filename">bitcoin.conf</div>

```bash
prune=550
# Sets pruned mode, amount in MiB (minimum is 550 or ~577mb)

testnet=1
# Starts Node in testnet (default is 0)

regtest=0
# Starts Node in regtest (default is 0)

txindex=0
# Indexes all transactions on the blockchain (default is 0)  

server=1
# Allows your node to receive JSON-RPC commands (default is 0)  

rpcuser=username
# Sets node RPC username (required for RPC commands) 

rpcpassword=password
# Sets node RPC password (required for RPC commands) 
```

In this example configuration, Bitcoin will startup a pruned (non-indexing) testnet node that has a RPC login and server setup to use the JSON-RPC API. Make sure to include your own configuration options, if you go this route.

## Option 2: Command line configuration flags
Configuration options can alternatively be specified by using flags in the command line during startup. Here is the same example using configuration flags:

```bash
bitcoind -prune=550 -testnet=1 -regtest=0 -txindex=0 -server=1 =rpcuser=username -rpcpassword=password
```

These flags have the same syntax as the `bitcoin.conf` file with an added dash in front. Options specified will be applied on startup, but will not persist unless you include them every time you start bitcoin.  

Similar to the `bitcoin.conf` file, configuration flag options can be used with either **bitcoind** or **bitcoin-qt**.


## Specifying the datadir
One easy way to make sure you have the right **configuration file** and **blocks folder** selected is to include the `datadir` flag pointing to where you installed the `Bitcoin` directory on startup.  


```bash
bitcoind -datadir=C:\Bitcoin

# OR

bitcoin-qt -datadir=C:\Bitcoin
```
> Make sure to specify your own **datadir** path to where you installed Bitcoin.
<br />

This will start bitcoin using the **bitcoin.conf** file if one is located in the `Bitcoin` folder. It will also store any blocks downloaded in a **blocks** folder.  