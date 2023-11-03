const abi = [
    {
        "inputs": [
            {
                "internalType": "contract IEntryPoint",
                "name": "entryPoint",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "owners",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "salt",
                "type": "uint256"
            }
        ],
        "name": "createAccount",
        "outputs": [
            {
                "internalType": "contract Wallet",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "owners",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "salt",
                "type": "uint256"
            }
        ],
        "name": "getAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "walletImplementation",
        "outputs": [
            {
                "internalType": "contract Wallet",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export default abi;