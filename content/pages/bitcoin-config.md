---
title: Bitcoin Core Configuration Reference
slug: bitcoin-config
templateKey: page
type: reference
date: 2021-01-11
dateModified: 2021-01-11
excerpt: Reference list of Bitcoin Core configuration options by category. Options can be applied in the bitcoin.conf file or with a command line flag during startup.
description: Reference list of Bitcoin Core configuration options by category. Options can be applied in the bitcoin.conf file or with a command line flag during startup.
tags:
  - Bitcoin Configuration
  - Reference
twitterImage: ../assets/site/twitter/twitter_bitcoin_config.jpg
---

<h2 id="miscellaneous">Miscellaneous Options</h2>

### Pre-generate Key Pairs

```bash
# Pre-generate this many public/private key pairs
keypool=100
```

### Blockchain Pruning

```bash
# default option
prune=0 (default)

# minimum is 550 MiB (~577 MB)
prune=550
```

<h2 id="network">Network Options</h2>

### Testnet

```bash
# default option
testnet=0

# testnet mode
testnet=1
```

Run on the test network instead of the actual bitcoin network.

### Regtest

```bash
# default option
regtest=0

# regtest mode
regtest=1
```
Run a regression test network with a new empty blockchain.

### Listening

```bash
#default option
listen=1
```

Listening mode, enabled by default except when 'connect' is being used.

### Port

```bash
# default option
port=8333
```

Port on which to listen for connections (default: 8333, testnet: 18333, regtest: 18444).

### Max Connections

```bash
# set the maximum node connections
maxconnections=8
```

Maximum number of inbound plus outbound connections.

### SOCKS5 Proxy

```bash
# set a proxy
proxy=127.0.0.1:9050
```

Connect via a SOCKS5 proxy.

### Add a Node

```bash
# add IP of a node to your addnode list
addnode=69.164.218.197
addnode=10.0.0.2:8333
```

Use as many addnode= settings as you like to connect to specific peers.

### Connect to a Node

- `connect=69.164.218.197`
- `connect=10.0.0.1:8333`

Alternatively use as many connect= settings as you like to connect ONLY to specific peers

### Bind Address

```bash
# bind an IP address
bind=<addr>
```

Bind to given address and always listen on it. Use [host]:port notation for IPv6.

### Bind Address and Add Permissions

```bash
# bind an IP address and add permissions
whitebind=perm@<addr>
```

Bind to given address and add permission flags to peers connecting to it. Use [host]:port notation for IPv6

<h2 id="json-rpc">JSON RPC Options</h2>

### Server

```bash
# default option
server=0

# server mode
server=1
```

Setting `server=1` tells Bitcoin-Qt and bitcoind to accept JSON-RPC commands.

### Bind RPC Address

```bash
# bind an RPC address
rpcbind=<addr>
```

Bind to given address to listen for JSON-RPC connections.

### RPC User

```bash
# RPC username
rpcuser=yourusername
```

Required along with RPC Password to use the JSON RPC API.

### RPC Password

```bash
# RPC password
rpcpassword=yourpassword
```

Required along with RPC User to use the JSON RPC API.

### RPC Timeout

```bash
# RPC timeout in minutes
rpcclienttimeout=30
```

Specify how many seconds bitcoin will wait for a complete RPC HTTP request.

### RPC Allow IP

```bash
# allow specific RPC IP addresses
rpcallowip=10.1.1.34/255.255.255.0
rpcallowip=1.2.3.4/24
rpcallowip=2001:db8:85a3:0:0:8a2e:370:7334/96
```

Allows outside hosts to connect via RPC. **NOT RECOMMENDED** as **rpcpassword** is transmitted unencrypted.

### RPC Port

```bash
# default option
rpcport=8332
```

Listen for RPC connections on this TCP port:

### RPC Connect

```bash
# connect to a remote RPC host
rpcconnect=127.0.0.1
```

Allows user to send bitcoin commands from a separate host/node.

<h2 id="wallet">Wallet Options</h2>

### Wallet Path
```bash
# specify a wallet path
wallet=</path/to/dir>
```

Specify where to find wallet, lockfile and logs. If not present, those files will be created as new.

### TX Confirm Target

```bash
# default option
txconfirmtarget=6
```

Create transactions that have enough fees so they are likely to begin confirmation within n blocks (default: 6). This setting is over-ridden by the -paytxfee option.

### Default Fee

```bash
# set a default transaction fee
paytxfee=0.00001000
```

Pay a transaction fee every time you send bitcoins.

<h2 id="user-interface">User Interface Options</h2>

### Minimized

```bash
# default option
min=0

# minimized mode
min=1
```

Start Bitcoin minimized

### Minimize to system tray
```bash
# default option
minimizetotray=0

# minimized to tray mode
minimizetotray=1
```

Minimize to the system tray

<!-- <h2 id="zeromq">ZeroMQ Options</h2> -->
