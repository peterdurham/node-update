---
title: Bitcoin Core JSON RPC API
slug: rpc-commands
templateKey: page
type: reference
date: 2021-01-11
dateModified: 2021-01-11
excerpt: Reference list of Bitcoin Core commands available by category. Commands can be used in the Bitcoin-qt console, using bitcoin-cli, or with the JSON RPC API.
description: Reference list of Bitcoin Core commands available by category. Commands can be used in the Bitcoin-qt console, using bitcoin-cli, or with the JSON RPC API.
tags:
  - JSON RPC API
  - Reference
twitterImage: ../assets/site/twitter/twitter_rpc_commands.jpg
---

<h2 id="blockchain">Blockchain Commands</h2>

### getbestblockhash 


Returns the **string** hash of the best block in the longest blockchain.  

*Examples:*  
```bash
bitcoin-cli getbestblockhash
```

```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbestblockhash", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getblock
 

Returns an **object** with data about the specified block hash.

*Inputs:*  
- blockhash **(string, required)**
- verbosity input *(number, optional)*

*Examples:*  
```bash
bitcoin-cli getblock "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getblockchaininfo


Returns an **object** containing info about the current state of the blockchain.

*Examples:*  
```bash
bitcoin-cli getblockchaininfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```

### getblockcount


Returns the **number** of blocks in the longest blockchain  

*Examples:*  
```bash
bitcoin-cli getblockcount
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getblockhash


Returns the **string** hash of block *height* in the longest blockchain  

*Inputs:*  
- height **(number, required)**

*Examples:*  
```bash
bitcoin-cli getblockhash 630000
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhash", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getblockheader


Returns an **object** header (no transaction data) of block *hash* specified.

*Inputs:*  
- hash **(string, required)**
- verbose *(boolean, optional)*  

*Examples:*  
```bash
bitcoin-cli getblockheader "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockheader", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getblockstats


Returns an **object** of computed statistics about the block with *hash* or *height* specified.  

*Inputs:*  
- hash or height **(string or number, required)**
- stats *(array, optional)*  

*Examples:*  

```bash
bitcoin-cli getblockstats "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
```
```bash
bitcoin-cli getblockstats 1000 '["minfeerate","avgfeerate"]'
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockstats", "params": [1000 '["minfeerate","avgfeerate"]'] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getchaintips


Returns an **array** all known tips in the blockchain, including main and orphaned branches. 

*Examples:*  
```bash
bitcoin-cli getchaintips
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getchaintips", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getchaintxstats


Returns an **object** of computed statistics about total number and rate of transactions.  

*Inputs:*  

- number of blocks *(number, optional)*
- last blockhash *(string, optional)*   

*Examples:*  

```bash
bitcoin-cli getchaintxstats 2016
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getchaintxstats", "params": [2016] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getdifficulty


Returns proof-of-work difficulty **number** as a multiple of the minimum difficulty.

*Examples:*  
```bash
bitcoin-cli getdifficulty
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdifficulty", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getmempoolancestors


Returns an **array** of txid **strings** for all ancestor transactions currently in the mempool of a specified *transaction id*.  

*Inputs:*  

- txid **(string, required)**
- verbose *(boolean, optional, default false)*  

*Examples:*  
```bash
bitcoin-cli getmempoolancestors "mytxid"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolancestors", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getmempooldescendants
 

Returns an **array** of txid **strings** for all descendant transactions currently in the mempool of a specified *transaction id*.  

*Inputs:*  

- txid **(string, required)**
- verbose *(boolean, optional, default false)*  

*Examples:*  
```bash
bitcoin-cli getmempooldescendants "mytxid"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempooldescendants", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getmempoolentry  



Returns **object** mempool data for the specified *transaction id* (if in mempool).  

*Inputs:*  

- txid **(string, required)**  

*Examples:*  
```bash
bitcoin-cli getmempoolentry "mytxid"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolentry", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getmempoolinfo

Returns **object** details about the current state of the mempool.

*Examples:*  
```bash
bitcoin-cli getmempoolinfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getrawmempool



Returns an **array** of **string** *transaction ids* for all transactions in the mempool.

*Inputs:*  

- verbose *(string, optional, default false)*  


*Examples:*  
```bash
bitcoin-cli getrawmempool
```
```bash
bitcoin-cli getrawmempool true
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawmempool", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### gettxout  



Returns **object** details about a specified *UTXO*.

*Inputs:*  

- txid **(string, required)**  
- vout number **(number, required)**
- include mempool *(boolean, optional, default true)*

*Examples:*  
```bash
bitcoin-cli gettxout "txid" 1
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxout", "params": ["txid", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### gettxoutproof 



Returns a hex-encded proof that a "txid" was included in a block. Only works if there is an unspent output for this transaction, or if the blockhash is specified.

*Inputs:*  

- txid array **(array of strings, required)**  
- blockhash *(string, optional)*

*Examples:*  

```bash
bitcoin-cli gettxoutproof ["txid",...] ( "blockhash" )
```


### gettxoutsetinfo



Returns an **object** with statistics about the set of unspent transaction outputs (UTXOS). Includes total amount of bitcoin.

*Examples:*  

```bash
bitcoin-cli gettxoutsetinfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxoutsetinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### preciousblock



Prioritizes a specific block over others with the same work.

*Inputs:*  

- blockhash **(string, required)**

*Examples:*  

```bash
bitcoin-cli preciousblock "blockhash"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "preciousblock", "params": ["blockhash"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### pruneblockchain



Prunes the blockchain up to a certain block height or unix timestamp.

*Inputs:*  

- block height **(number, required)**

*Examples:*  

```bash
bitcoin-cli pruneblockchain 1000
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "pruneblockchain", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### savemempool



Saves the mempool data to disk. 

*Examples:*  

```bash
bitcoin-cli savemempool
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "savemempool", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```



### verifychain



Verifies the blockchain at a specified thoroughness and number of blocks.

*Inputs:*  

- checklevel *(number 0-4, optional, default=3)*
- nblocks *(number, optional, default=6, 0=all)*

*Examples:*  

```bash
bitcoin-cli verifychain
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifychain", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### verifytxoutproof

Verifies that a proof points to a transaction in a block.



Returns a transaction **object** if the proof is valid. Throws an error otherwise.

*Inputs:*  

- proof **(hex-encoded string, required)**





<h2 id="control">Control Commands</h2>


### getmemoryinfo



Returns an **object** with data about memory usage.

*Inputs:*  

- mode *(string, optional, default="stats")*

*Examples:*  

```bash
bitcoin-cli getmemoryinfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmemoryinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getrpcinfo



Returns **object** details about the RPC server.


*Examples:*  

```bash
bitcoin-cli getrpcinfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrpcinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### help



Lists all commands, or help for a specific command.

*Inputs:*  

- command *(string, optional)*

*Examples:*  

```bash
bitcoin-cli help
```
```bash
bitcoin-cli help getblockheight
```

### logging



Retrieves an **object** of current logging configuration without an argument. Sets logging configuration when argument is specified.

*Inputs:*  

- categories to include *(array of strings, optional)*
- categories to exclude *(array of strings, optional)*

*Examples:*  

```bash
bitcoin-cli logging "[\"all\"]" "[\"http\"]"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "logging", "params": [["all"], ["libevent"]] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```
### stop

Stops the Bitcoin server

### uptime



Returns a **number** of the total server uptime.

*Examples:*  

```bash
bitcoin-cli uptime
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "uptime", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


<h2 id="generating">Generating Commands</h2>

### generate

Mines up to nblocks to an address in the wallet when running in **RegTest** mode.


*Inputs:*  

- nblocks **(nunber, required)**
- max tries *(number, optional, default=1000000)*


*Examples:*  

```bash
bitcoin-cli generate 11
```


### generatetoaddress

Mines up to nblocks to a specified address when running in **RegTest** mode.  



Returns an **array** of string block hashes for the mined blocks.

*Inputs:*  

- nblocks **(nunber, required)**
- address **(string, required)**
- max tries *(number, optional, default=1000000)*


*Examples:*  

```bash
bitcoin-cli generatetoaddress 11 "myaddress"
```


<h2 id="mining">Mining Commands</h2>

### getblocktemplate



Returns **object** data needed to construct a new block to work on.

*Inputs:*  

- template_request **(json object, required)**

with the following rules spec:

```bash
“rules”: [ (json array, required) A list of strings “support”, (string) client side supported softfork deployment … ], }
```

*Examples:*  

```bash
bitcoin-cli getblocktemplate {"rules": ["segwit"]}
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [{"rules": ["segwit"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```
### getmininginfo



Returns an **object** with mining related information.

*Examples:*  

```bash
bitcoin-cli getmininginfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getnetworkhashps



Returns a **number** of the estimated network hashes per second based on a number of previous blocks.

*Inputs:*

- nblocks *(number, optional, default=120)*
- height *(number, optional, default=-1)*

*Examples:*  

```bash
bitcoin-cli getnetworkhashps
```
```bash
bitcoin-cli getnetworkhashps 2016 630000
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkhashps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```

### prioritisetransaction

Prioritizes or deprioritizes transactions mined into a block based on a provided fee delta. Fee delta is an amount of satoshis to add or subtract from a specific transactions absolute fee when forming the block's transactions.  

*Inputs:*

- txid **(string, required)**
- dummy *(number, optional, default=0)*
- fee_delta **(number, required)**

*Examples:*  

```bash
bitcoin-cli prioritisetransaction "txid" 0.0 10000
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "prioritisetransaction", "params": ["txid", 0.0, 10000] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### submitblock

Attempts to submit a new block to the network. Dummy data is for BIP 22 compatibility.

*Inputs:*

- hexdata **(hex-encoded string, required)**
- dummy *(number, optional, default=ignored)*

*Examples:*  

```bash
bitcoin-cli submitblock "mydata"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitblock", "params": ["mydata"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```

### submitheader

Decodes given hexdata as a header to submit to the longest candidate chain if valid.

*Inputs:*

- hexdata **(hex-encoded string, required)**

*Examples:*  

```bash
bitcoin-cli submitheader "aabbcc"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitheader", "params": ["aabbcc"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


<h2 id="network">Network Commands</h2>

### addnode

Attempts to add or remove a node from the node connections list.

*Inputs:*

- node IP **(string, required)**
- command **(string, required, options: 'add', 'remove', or 'onetry')**

*Examples:*  

```bash
bitcoin-cli addnode "192.168.0.6:8333" "onetry"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addnode", "params": ["192.168.0.6:8333", "onetry"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### clearbanned

Clears all banned IPs.

*Examples:*  

```bash
bitcoin-cli clearbanned
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "clearbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### disconnectnode

Disconnects from a specified peer node.

*Inputs:*

- IP address *(string, optional, default uses nodeid instead)*
- nodeid *(number, optional, default uses address instead)*


*Examples:*  

```bash
bitcoin-cli disconnectnode "192.168.0.6:8333"
```
```bash
bitcoin-cli disconnectnode "" 1
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "disconnectnode", "params": ["192.168.0.6:8333"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getaddednodeinfo
Returns **object** information about a specific added node or an **array of objects** about all added nodes.

*Inputs:*

- node IP *(string, optional, default=all nodes)*


*Examples:*  

```bash
bitcoin-cli getaddednodeinfo
```
```bash
bitcoin-cli getaddednodeinfo "192.168.0.201"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddednodeinfo", "params": ["192.168.0.201"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getconnectioncount

Returns the **number** of connections to other nodes.

*Examples:*  

```bash
bitcoin-cli getconnectioncount
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getconnectioncount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getnettotals

Returns an **object** with information about network traffic.

*Examples:*  

```bash
bitcoin-cli getnettotals
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnettotals", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getnetworkinfo

Returns an **object** with state information about P2P networking.

*Examples:*  

```bash
bitcoin-cli getnetworkinfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getnodeaddresses

Returns known addresses which can potentially be used to find new nodes in the network.

*Inputs:*

- count *(number, optional, default=1)*



*Examples:*  

```bash
bitcoin-cli getnodeaddresses 8
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnodeaddresses", "params": [8] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getpeerinfo

Returns an **array of object** data about connected nodes.



*Examples:*  

```bash
bitcoin-cli getpeerinfo
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listbanned
 
Lists all banned IPs/Subnets



*Examples:*  

```bash
bitcoin-cli listbanned
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### ping

Measures ping time by sending a request to all connected nodes.

*Examples:*  

```bash
bitcoin-cli ping
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "ping", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```

### setban

Attempts to add or remove an IP or Subnet from the banned list.

*Inputs:*

- IP address/Subnet **(string, required)**
- command **(string, required, options: "add" or "remove")**
- IP address/Subnet *(string, optional, default=0 or 24h)*
- absolute *(string, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli setban "192.168.0.6" "add" 86400
```
```bash
bitcoin-cli setban "192.168.0.0/24" "add"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setban", "params": ["192.168.0.6", "add", 86400] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### setnetworkactive

Disable/enable p2p network activity.

*Inputs:*

- state **(boolean, required)**

*Examples:*  

```bash
bitcoin-cli setnetworkactive true
```
```bash
bitcoin-cli setnetworkactive false
```

<h2 id="raw-transaction">Raw Transaction Commands</h2>

### analyzepsbt

Analyzes and provides information about the current state of a PBST and its inputs.

*Inputs:*

- pbst **(string, required)**

*Examples:*  

```bash
bitcoin-cli analyzepsbt "psbt"
```


### combinepsbt

Combines multiple PBSTs into one transaction.

*Inputs:*

- txns array **(array of pbst strings, required)**

*Examples:*  

```bash
bitcoin-cli combinepsbt ["mybase64_1", "mybase64_2", "mybase64_3"]
```


### combinerawtransaction

Combines multiple PBSTs into one transaction. Combined transaction may be partially signed or fully signed.

*Inputs:*

- txns array **(array of hex strings, required)**

*Examples:*  

```bash
bitcoin-cli combinerawtransaction ["myhex1", "myhex2", "myhex3"]
```


### converttopsbt

Converts a network serialized transaction to a PSBT. This should be used only with **createrawtransaction** and **fundrawtransaction**.

*Inputs:*

- hexstring of raw tx **(hex string, required)**
- permit signature data *(boolean, optional, default=false)*
- iswitness *(boolean, optional)*

*Examples:*  

```bash
bitcoin-cli createrawtransaction "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"data\":\"00010203\"}]"
```
```bash
bitcoin-cli converttopsbt "rawtransaction"
```


### createpsbt

Creates a transaction with PBST format.

*Inputs:*

- inputs **(array of objects, required)**
- outputs **(array of objects, required)**
- locktime *(number, optional, default=0)*
- replaceable *(boolean, optional, default=false)*


*Examples:*  

```bash
bitcoin-cli createpsbt "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"data\":\"00010203\"}]"
```


### createrawtransaction

Creates and returns a raw hex-encoded transaction with the given inputs and outputs.

*Inputs:*

- inputs **(array of objects, required)**
- outputs **(array of objects, required)**
- locktime *(number, optional, default=0)*
- replaceable *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli createrawtransaction "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"address\":0.01}]"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createrawtransaction", "params": ["[{\"txid\":\"myid\",\"vout\":0}]", "[{\"address\":0.01}]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### decodepsbt

Returns **object** data about a serialized based64 encoded PBST.

*Inputs:*

- pbst **(PBST base64 string, required)**

*Examples:*  

```bash
bitcoin-cli decodepsbt "psbt"
```



### decoderawtransaction

Returns **object** data about a hex-encoded transaction.

*Inputs:*

- transaction **(hex string, required)**
- iswitness *(boolean, optional)*

*Examples:*  

```bash
bitcoin-cli decoderawtransaction "hexstring"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decoderawtransaction", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### decodescript

Decodes a hex-encoded script.

*Inputs:*

- hex-encoded script **(string, required)**


*Examples:*  

```bash
bitcoin-cli decodescript "hexstring"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decodescript", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### finalizepsbt

Finalizes the inputs of a PBST. Converts it to a network serialized transaction that can be sent if fully signed. Creates a PBST with the signed fields filled out otherwise.

*Inputs:*

- pbst **(base 64 string, required)**
- extract *(boolean, optional, default=true)*

*Examples:*  

```bash
bitcoin-cli finalizepsbt "psbt"
```



### fundrawtransaction


Add inputs to a transaction until it has enough in value to meet its out value.

*Inputs:*

- raw transaction **(hex string, required)**
- options *(object, optional)*
- iswitness *(boolean, optional)*

*Examples:*  

```bash
bitcoin-cli createrawtransaction "[]" "{\"myaddress\":0.01}"
```
```bash
bitcoin-cli fundrawtransaction "rawtransactionhex"
```
```bash
bitcoin-cli signrawtransactionwithwallet "fundedtransactionhex"
```
```bash
bitcoin-cli sendrawtransaction "signedtransactionhex"
```


### getrawtransaction

Returns raw transaction data if it is available to the node. Access all transactions with the **txindex** configuration.

*Inputs:*

- txid **(string, required)**
- verbose *(boolean, optional, default=false)*
- blockhash *(string, optional)*

*Examples:*  

```bash
bitcoin-cli getrawtransaction "mytxid"
```
```bash
bitcoin-cli getrawtransaction "mytxid" false "myblockhash"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawtransaction", "params": ["mytxid", true] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### joinpsbts

Joins multiple distinct PBSTs into a single PBST.

*Inputs:*

- txns **(array of base64 strings, required)**

*Examples:*  

```bash
bitcoin-cli joinpsbts ["mybase64_1", "mybase64_2", "mybase64_3"]
```



### sendrawtransaction

Sends a signed raw transaction (serialized, hex-encoded) to connected nodes.

*Inputs:*

- raw tx **(hex string, required)**
- allowhighfees *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli createrawtransaction "[{\"txid\" : \"mytxid\",\"vout\":0}]" "{\"myaddress\":0.01}"
```
```bash
bitcoin-cli signrawtransactionwithwallet "myhex"
```
```bash
bitcoin-cli sendrawtransaction "signedhex"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransaction", "params": ["signedhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### signrawtransactionwithkey

Signs inputs for a raw transaction with provided private keys.

*Inputs:*

- raw tx **(hex string, required)**
- privkeys **(array of strings, required)**
- prevtxs *(array of tx outputs, optional)*
- sighashtype *(string, optional, default=ALL)*


*Examples:*  

```bash
bitcoin-cli signrawtransactionwithkey "myhex"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signrawtransactionwithkey", "params": ["myhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### testmempoolaccept

Tests provided transactions to see if they will be accepted by the mempool and returns **object** data.

*Inputs:*

- raw txns **(array of hex strings, required)**
- allowhighfees *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli testmempoolaccept ["signedhex"]
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "testmempoolaccept", "params": [["signedhex"]] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### utxoupdatepsbt

Updates a PSBT with witness UTXOs retrieved from the UTXO set or the mempool.

*Inputs:*

- pbst **(base64 string, required)**


*Examples:*  

```bash
bitcoin-cli utxoupdatepsbt "psbt"
```


<h2 id="util">Util Commands</h2>

### createmultisig

Creates a multi-signature address with n signature of m keys required. Returns an **object** with the address and redeem script.

*Inputs:*

- number of signatures required **(number, required)**
- public keys **(array, required)**
- address_type *(string, optional, default="legacy", can be “p2sh-segwit” and “bech32”)*

*Examples:*  

```bash
bitcoin-cli createmultisig 2 "[\"03789ed0bb717d88f7d321a368d905e7430207ebbd82bd342cf11ae157a7ace5fd\",\"03dbc6764b8884a92e871274b87583e6d5c2a58819473e17e107ef3f6aa5a61626\"]"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createmultisig", "params": [2, "[\"03789ed0bb717d88f7d321a368d905e7430207ebbd82bd342cf11ae157a7ace5fd\",\"03dbc6764b8884a92e871274b87583e6d5c2a58819473e17e107ef3f6aa5a61626\"]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### deriveaddresses

Derives one or more addresses corresponding to an output descriptor.

*Inputs:*

- descriptor **(string, required)**
- range *(number or array, optional)*

*Examples:*  

```bash
bitcoin-cli deriveaddresses "wpkh([d34db33f/84h/0h/0h]xpub6DJ2dNUysrn5Vt36jH2KLBT2i1auw1tTSSomg8PhqNiUtx8QX2SvC9nrHu81fT41fvDUnhMjEzQgXnQjKEu3oaqMSzhSrHMxyyoEAmUHQbY/0/*)#trd0mf0l" "[0,2]"
```


### estimatesmartfee

Estimates the approximate fee per kilobyte needed for a transaction to begin confirmation within conf_target blocks if possible and return the number of blocks for which the estimate is valid. 

*Inputs:*

- conf_target **(number, required)**
- estimate_mode *(string, optional, default="CONSERVATIVE", other options: “UNSET” and “ECONOMICAL”)*


*Examples:*  

```bash
bitcoin-cli estimatesmartfee 6
```



### getdescriptorinfo

Analyze a descriptor.

*Inputs:*

- descriptor **(string, required)**

*Examples:*  

```bash
bitcoin-cli getdescriptorinfo "wpkh([d34db33f/84h/0h/0h]0279be667ef9dcbbac55a06295Ce870b07029Bfcdb2dce28d959f2815b16f81798)"
```


### signmessagewithprivkey

Sign a message with the private key of an address.

*Inputs:*

- privkey **(string, required)**
- message **(string, required)**


*Examples:*  

```bash
bitcoin-cli signmessagewithprivkey "privkey" "my message"
```
```bash
bitcoin-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessagewithprivkey", "params": ["privkey", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### validateaddress

Return an **object** with information about the given bitcoin address.

*Inputs:*

- address **(string, required)**

*Examples:*  

```bash
bitcoin-cli validateaddress "1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "validateaddress", "params": ["1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### verifymessage

Verify a signed message.

*Inputs:*

- address **(string, required)**
- signature **(base64 string, required)**
- message **(string, required)**

*Examples:*  

```bash
bitcoin-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifymessage", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "signature", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


<h2 id="wallet">Wallet Commands</h2>

### abandontransaction

Mark in-wallet transaction to be abandoned. This will mark all in-wallet descendant transactions as abandoned too, allowing them to be respent. Only works on transactions not yet in the mempool or included in a block. 

*Inputs:*

- txid **(string, required)**

*Examples:*  

```bash
bitcoin-cli abandontransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "abandontransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### abortrescan

Stops current wallet rescan triggered by an RPC call, e.g. by an importprivkey call.

*Examples:*  

```bash
bitcoin-cli abortrescan
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "abortrescan", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```

### addmultisigaddress

Add a n-required-to-sign multisignature address to the wallet. Each key is a Bitcoin address or hex-encoded public key.

*Inputs:*

- nrequired **(number, required)**
- public keys **(array, required)**
- label *(string, optional)*
- address_type *(string, optional)*

*Examples:*  

```bash
bitcoin-cli addmultisigaddress 2 "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addmultisigaddress", "params": [2, "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```

### backupwallet

Safely copies current wallet file to destination, which can be a directory or a path with filename.

*Inputs:*

- destination **(string, required)**

*Examples:*  

```bash
bitcoin-cli backupwallet "backup.dat"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "backupwallet", "params": ["backup.dat"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### bumpfee

Bumps the fee of an RBF transaction.

*Inputs:*

- txid **(string, required)**
- options *(object, optional)*

*Examples:*  

```bash
bitcoin-cli bumpfee <txid>
```


### createwallet

Creates and loads a new wallet. Allows for watch only mode or a blank wallet (no seed).

*Inputs:*

- wallet_name **(string, required)**
- disable_private_keys *(boolean, optional, default=false)*
- blank *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli createwallet "testwallet"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createwallet", "params": ["testwallet"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### dumpprivkey

Reveals the private key corresponding to ‘address’.

*Inputs:*

- address **(string, required)**


*Examples:*  

```bash
bitcoin-cli dumpprivkey "myaddress"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpprivkey", "params": ["myaddress"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

```


### dumpwallet

Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files.

*Inputs:*

- filename **(string, required)**

*Examples:*  

```bash
bitcoin-cli dumpwallet "test"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### encryptwallet

Encrypts the wallet with ‘passphrase’. This is for first time encryption. Requires the passphrase to be used for sending or signing transactions.

*Inputs:*

- passphrase **(string, required)**

*Examples:*  

```bash
bitcoin-cli encryptwallet "my pass phrase"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "encryptwallet", "params": ["my pass phrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```
### getaddressesbylabel

Returns the an **object** with the list of addresses assigned the specified label as keys.

*Inputs:*

- label **(string, required)**

*Examples:*  

```bash
bitcoin-cli getaddressesbylabel "rent"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressesbylabel", "params": ["rent"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### getaddressinfo

Return an **object** with information about the given bitcoin address. Some information requires the address to be in the wallet.


*Inputs:*

- address **(string, required)**


*Examples:*  

```bash
bitcoin-cli getaddressinfo "1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressinfo", "params": ["1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getbalance

Returns a **number** of the total available, spendable balance.

*Inputs:*

- dummy (string, optional, exclude or set to **"*"** for compatibility)
- minconf *(number, optional, default=0)*
- include_watchonly *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli getbalance
```
```bash
bitcoin-cli getbalance "*" 144
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": ["*", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getnewaddress

Returns a new Bitcoin address for receiving payments.  

*Inputs:*

- label *(string, optional, default="")*
- address_type *(string, optional, options include: "legacy", "p2sh-segwit", and "bech32")*

*Examples:*  

```bash
bitcoin-cli getnewaddress
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getrawchangeaddress

Returns a new Bitcoin address, for receiving change using raw transactions.

*Inputs:*

- address_type *(string, optional, options include: "legacy", "p2sh-segwit", and "bech32")*

*Examples:*  

```bash
bitcoin-cli getrawchangeaddress
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawchangeaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getreceivedbyaddress

Returns a **number** of the total amount received by the given address in transactions with at least minconf confirmations.

*Inputs:*

- address **(string, required)**
- minconf *(number, optional, default=1)*

*Examples:*  

```bash
bitcoin-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX"
```
```bash
bitcoin-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" 144
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaddress", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getreceivedbylabel

Returns a **number** of the total amount received by addresses with **label** in transactions with at least **minconf** confirmations.

*Inputs:*

- label **(string, required)**
- minconf *(number, optional, default=1)*

*Examples:*  

```bash
bitcoin-cli getreceivedbylabel "rent"
```
```bash
bitcoin-cli getreceivedbylabel "rent" 4032
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbylabel", "params": ["tabby", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### gettransaction

Get detailed **object** information about in-wallet transaction **txid**.

*Inputs:*

- txid **(string, required)**
- include_watchonly *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### getunconfirmedbalance

Returns the server’s total unconfirmed balance


### getwalletinfo

Returns an **object** containing various wallet state info.

*Examples:*  

```bash
bitcoin-cli getwalletinfo
```

```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### importaddress

Adds an address or script (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup.  

If you have the full public key, you should call importpubkey instead of this.

*Inputs:*

- address **(string, required)**
- label *(string, optional, default="")*
- rescan *(boolean, optional, default=true)*
- p2sh *(boolean, optional, default="false)*

*Examples:*  

```bash
bitcoin-cli importaddress "myaddress"
```
```bash
bitcoin-cli importaddress "myaddress" "testing" false
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importaddress", "params": ["myaddress", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### importmulti

Import addresses/scripts (with private or public keys, redeem script (P2SH)), optionally rescanning the blockchain from the earliest creation time of the imported scripts. Requires a new wallet backup.

If an address/script is imported without all of the private keys required to spend from that address, it will be watchonly. The ‘watchonly’ option must be set to true in this case or a warning will be returned.

Conversely, if all the private keys are provided and the address/script is spendable, the watchonly option must be set to false, or a warning will be returned.

*Inputs:*

- requests **(data array, required)**
- options *(object, optional)*

*Examples:*  

```bash
bitcoin-cli importmulti '[{ "scriptPubKey": { "address": "<my address>" }, "timestamp":1455191478 }, { "scriptPubKey": { "address": "<my 2nd address>" }, "label": "example 2", "timestamp": 1455191480 }]'
```
```bash
bitcoin-cli importmulti '[{ "scriptPubKey": { "address": "<my address>" }, "timestamp":1455191478 }]' '{ "rescan": false}'
```
### importprivkey

Adds a private key (as returned by dumpprivkey) to your wallet. Requires a new wallet backup.

*Inputs:*

- privkey **(string, required)**
- label *(string, optional)*
- rescan *(boolean, optional, default=true)*

*Examples:*  

```bash
bitcoin-cli importprivkey "mykey"
```
```bash
bitcoin-cli importprivkey "mykey" "testing" false
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprivkey", "params": ["mykey", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```


### importprunedfunds

Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included.

*Inputs:*

- rawtransaction **(string, required)**
- txoutproof **(string, required)**



### importpubkey

Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup.

*Inputs:*

- pubkey **(string, required)**
- label *(string, optional, default="")*
- rescan *(boolean, optional, default=true)*

*Examples:*  

```bash
bitcoin-cli importpubkey "mypubkey"
```
```bash
bitcoin-cli importpubkey "mypubkey" "testing" false
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importpubkey", "params": ["mypubkey", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### importwallet

Imports keys from a wallet dump file (see dumpwallet). Requires a new wallet backup to include imported keys.  

*Inputs:*

- filename **(string, required)**

*Examples:*  

```bash
bitcoin-cli dumpwallet "test"
```
```bash
bitcoin-cli importwallet "test"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### keypoolrefill

Fills the keypool with new private/public key pairs.

*Inputs:*

- newsize *(number, optional, default=100)*

*Examples:*  

```bash
bitcoin-cli keypoolrefill
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "keypoolrefill", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listaddressgroupings

Lists groups of addresses which have had their common ownership made public by common use as inputs or as the resulting change in past transactions.

*Examples:*  

```bash
bitcoin-cli listaddressgroupings
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressgroupings", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```
### listlabels

Returns the list of all labels, or labels that are assigned to addresses with a specific purpose.

*Inputs:*

- purpose *(string, optional, options include: "send" and "receive")*

*Examples:*  

```bash
bitcoin-cli listlabels
```
```bash
bitcoin-cli listlabels receive
```
```bash
bitcoin-cli listlabels send
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listlabels", "params": [receive] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listlockunspent

Returns an **array of objects** with a list of temporarily unspendable outputs.

See the lockunspent call to lock and unlock transactions for spending.


*Examples:*  

```bash
bitcoin-cli lockunspent false "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"
```
```bash
bitcoin-cli listlockunspent
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listlockunspent", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listreceivedbyaddress

List an **array of objects** with balances by receiving address.

*Inputs:*

- minconf *(number, optional, default=1)*
- include_empty *(boolean, optional, default=false)*
- include_watchonly *(boolean, optional, default=false)*
- address_filter *(string, optional)*

*Examples:*  

```bash
bitcoin-cli listreceivedbyaddress
```
```bash
bitcoin-cli listreceivedbyaddress 6 true
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaddress", "params": [6, true, true, "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listreceivedbylabel

List an **array of objects** with received transactions by label.

*Inputs:*

- minconf *(number, optional, default=1)*
- include_empty *(boolean, optional, default=false)*
- include_watchonly *(boolean, optional, default=false)*


*Examples:*  

```bash
bitcoin-cli listreceivedbylabel
```
```bash
bitcoin-cli listreceivedbylabel 6 true
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbylabel", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listsinceblock

Get all transactions in blocks since block (blockhash), or all transactions if omitted.

*Inputs:*

- blockhash *(string, optional)*
- target_confirmations *(number, optional, default=1)*
- include_watchonly *(boolean, optional, default=false)*
- include_removed *(boolean, optional, default=true)*

*Examples:*  

```bash
bitcoin-cli listsinceblock
```
```bash
bitcoin-cli listsinceblock "000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad" 6
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listtransactions

Returns a list of most recent transaction. If a label name is provided, this will return only incoming transactions paying to addresses with the specified label.

*Inputs:*

- label *(string, optional)*
- count *(number, optional, default=10)*
- skip *(number, optional, default=0)*
- include_watchonly *(boolean, optional, default=true)*

*Examples:*  

```bash
bitcoin-cli listtransactions
```
```bash
bitcoin-cli listtransactions "*" 20 100
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": ["*", 20, 100] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listunspent

Returns an **array** of unspent transaction outputs with between minconf and maxconf (inclusive) confirmations.

Optionally filter to only include txouts paid to specified addresses.

*Inputs:*

- minconf *(number, optional, default=1)*
- maxconf *(number, optional, default=9999999)*
- addresses *(array, optional, default=empty array)*
- include_unsafe *(boolean, optional, default=true)*
- query_options *(object, optional)*

*Examples:*  

```bash
bitcoin-cli listunspent
```
```bash
bitcoin-cli listunspent 6 9999999 "[\"1PGFqEzfmQch1gKD3ra4k18PNj3tTUUSqg\",\"1LtvqCaApEdUGFkpKMM4MstjcaL4dKg8SP\"]"
```
```bash
bitcoin-cli listunspent 6 9999999 '[]' true '{ "minimumAmount": 0.005 }'
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listunspent", "params": [6, 9999999, [] , true, { "minimumAmount": 0.005 } ] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listwalletdir

Returns a list of wallets in the wallet directory.

*Examples:*  

```bash
bitcoin-cli listwalletdir
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listwalletdir", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### listwallets

Returns a list of currently loaded wallets.

For full information on the wallet, use **getwalletinfo**

*Examples:*  

```bash
bitcoin-cli listwallets
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listwallets", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### loadwallet

Loads a wallet from a wallet file or directory.

Note that all wallet command-line options used when starting bitcoind will be applied to the new wallet (eg -zapwallettxes, upgradewallet, rescan, etc).

*Inputs:*

- filename **(string, required)**

*Examples:*  

```bash
bitcoin-cli loadwallet "test.dat"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "loadwallet", "params": ["test.dat"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### lockunspent

Updates list of temporarily unspendable outputs.

Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs.

If no transaction outputs are specified when unlocking then all current locked transaction outputs are unlocked.

A locked transaction output will not be chosen by automatic coin selection, when spending bitcoins.

Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output list is always cleared (by virtue of process exit) when a node stops or fails.

Also see the listunspent call


*Inputs:*

- unlock **(boolean, required)**
- transactions *(array, optional, default=empty array)*


*Examples:*  

```bash
bitcoin-cli listunspent
```
```bash
bitcoin-cli lockunspent false "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "lockunspent", "params": [false, "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### removeprunedfunds

Deletes the specified transaction from the wallet. Meant for use with pruned wallets and as a companion to importprunedfunds. This will affect wallet balances.

*Inputs:*

- txid **(string, required)**

*Examples:*  

```bash
bitcoin-cli removeprunedfunds "a8d0c0184dde994a09ec054286f1ce581bebf46446a512166eae7628734ea0a5"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "removeprunedfunds", "params": ["a8d0c0184dde994a09ec054286f1ce581bebf46446a512166eae7628734ea0a5"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### rescanblockchain

Rescan the local blockchain for wallet related transactions. 

*Inputs:*

- start_height *(number, optional, default=0)*
- stop_height *(number, optional)*

*Examples:*  

```bash
bitcoin-cli rescanblockchain 100000 120000
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "rescanblockchain", "params": [100000, 120000] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### sendmany

Send multiple times. Amounts are double-precision floating point numbers.

*Inputs:*

- dummy **(string, required, set to "" for backwards compatibility)**
- amounts **(object, required)**
- minconf *(number, optional, default=1)*
- comment *(string, optional)*
- subtractfeefrom *(array, optional)*
- replaceable *(boolean, optional)*
- conf_target *(number, optional)*
- estimate_mode *(string, optional, default="UNSET", other options: "ECONOMICAL", "CONSERVATIVE")*

*Examples:*  

```bash
bitcoin-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}"
```
```bash
bitcoin-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 6 "testing"
```
```bash
bitcoin-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 1 "" "[\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\",\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\"]"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendmany", "params": ["", {"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX":0.01,"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz":0.02}, 6, "testing"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### sendtoaddress

Send an amount to a given address.

*Inputs:*

- address **(string, required)**
- amount **(number or string, required)**
- comment *(string, optional)*
- comment_to *(string, optional)*
- subtractfeefromamount *(boolean, optional, default=false)*
- replaceable *(boolean, optional)*
- conf_target *(number, optional)*
- estimate_mode *(string, optional, default="UNSET", other options: "ECONOMICAL", "CONSERVATIVE")*

*Examples:*  

```bash
bitcoin-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1
```
```bash
bitcoin-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "donation" "seans outpost"
```
```bash
bitcoin-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "" "" true
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd", 0.1, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### sethdseed

Set or generate a new HD wallet seed. Non-HD wallets will not be upgraded to being a HD wallet. Wallets that are already HD will have a new HD seed set so that new keys added to the keypool will be derived from this new seed.

Note that you will need to MAKE A NEW BACKUP of your wallet after setting the HD wallet seed.

*Inputs:*

- newkeypool *(boolean, optional, default=true)*
- seed *(string, optional, default=random seed)*

*Examples:*  

```bash
bitcoin-cli sethdseed
```
```bash
bitcoin-cli sethdseed false
```
```bash
bitcoin-cli sethdseed true "wifkey"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sethdseed", "params": [true, "wifkey"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### setlabel

Sets a label associated with the given address.

*Inputs:*

- address **(string, required)**
- label **(string, required)**


*Examples:*  

```bash
bitcoin-cli setlabel "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "rent"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setlabel", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "rent"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### settxfee

Set the transaction fee per kB for this wallet. Overrides the global -paytxfee command line parameter.

*Inputs:*

- fee amount in BTC/kb **(number or string, required)**

*Examples:*  

```bash
bitcoin-cli settxfee 0.00001
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxfee", "params": [0.00001] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### signmessage

Sign a message with the private key of an address

*Inputs:*

- address **(string, required)**
- message **(string, required)**


*Examples:*  

```bash
bitcoin-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "my message"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessage", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### signrawtransactionwithwallet

Sign inputs for raw transaction (serialized, hex-encoded).

The second optional argument (may be null) is an array of previous transaction outputs that this transaction depends on but may not yet be in the block chain

*Inputs:*

- hexstring **(string, required)**
- prevtxs *(array, optional)*
- sighashtype *(string, optional, default="ALL")*

*Examples:*  

```bash
bitcoin-cli signrawtransactionwithwallet "myhex"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signrawtransactionwithwallet", "params": ["myhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### unloadwallet

Unloads the wallet referenced by the request endpoint otherwise unloads the wallet specified in the argument.

Specifying the wallet name on a wallet endpoint is invalid.

*Inputs:*

- wallet_name *(string, optional, default=the wallet from the RPC request)*

*Examples:*  

```bash
bitcoin-cli unloadwallet wallet_name
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "unloadwallet", "params": [wallet_name] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### walletcreatefundedpsbt

Creates and funds a transaction in the Partially Signed Transaction format. Inputs will be added if supplied inputs are not enough Implements the Creator and Updater roles.

*Inputs:*

- inputs **(array, required)**
- outputs **(array, required)**
- locktime *(number, optional, default=0)*
- options *(object, optional)*
- bip32derivs *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli walletcreatefundedpsbt "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"data\":\"00010203\"}]"
```

### walletlock

Removes the wallet encryption key from memory, locking the wallet.

After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.


*Examples:*  

```bash
bitcoin-cli walletlock
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "walletlock", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### walletpassphrase

Stores the wallet decryption key in memory for ‘timeout’ seconds.

This is needed prior to performing transactions related to private keys such as sending bitcoins Note:

Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.

*Inputs:*

- passphrase **(string, required)**
- timeout **(number, required)**

*Examples:*  

```bash
bitcoin-cli walletpassphrase "my pass phrase" 60
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "walletpassphrase", "params": ["my pass phrase", 60] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### walletpassphrasechange

Changes the wallet passphrase from **oldpassphrase** to **newpassphrase**.

*Inputs:*

- oldpassphrase **(string, required)**
- newpassphrase **(number, required)**

*Examples:*  

```bash
bitcoin-cli walletpassphrasechange "old one" "new one"
```
```bash
curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "walletpassphrasechange", "params": ["old one", "new one"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### walletprocesspsbt

Update a PSBT with input information from our wallet and then sign inputs that we can sign for.

*Inputs:*

- pbst **(string, required)**
- sign *(boolean, optional, default=true)*
- sighashtype *(string, optional, default="ALL")*
- bip32derivs *(boolean, optional, default=false)*

*Examples:*  

```bash
bitcoin-cli walletprocesspsbt "psbt"
```

