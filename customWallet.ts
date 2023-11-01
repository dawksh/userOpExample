
import { ethers } from 'ethers';
import { config } from 'dotenv';
import axios from "axios";
config();

const sender = "0x49c996159faf12b4eF1F347f7dD6bdA157710a79";
const nonce = 0
const callGasLimit = "0x5318";
const verificationGasLimit = "0x13ab5";
const preVerificationGas = "0xd373";
const maxFeePerGas = "0x16";
const maxPriorityFeePerGas = "0x2";
const paymasterAndData = "0x";

const accountABI = ["function execute(address to, uint256 value, bytes data)"];

const account = new ethers.utils.Interface(accountABI);

const callData = account.encodeFunctionData("execute", [ethers.utils.getAddress("0x28172273CC1E0395F3473EC6eD062B6fdFb15940"), ethers.utils.parseEther("0.01"), "0x"])


const packedData = ethers.utils.defaultAbiCoder.encode(
    [
        "address",
        "uint256",
        "bytes32",
        "bytes32",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes32",
    ],
    [
        sender,
        nonce,
        "0x373ace975747ee10c63afec210e686d05a2f825ecafb07241a84abb0b8655a00",
        ethers.utils.keccak256(callData),
        callGasLimit,
        verificationGasLimit,
        preVerificationGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        ethers.utils.keccak256(paymasterAndData),
    ]
);

const enc = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "address", "uint256"],
    [ethers.utils.keccak256(packedData), "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", "5"]
);

console.log(enc)

const userOpHash = enc;
const signedUserOpHash = "0x815aac61aae3cc909e6a7fbda4c80ef81a7d63df0d99109941186eda2372d5617e2117c7b3180da680f1705e47a1a7c561d55ec080e4dfdad525c69d7b09e8c21b";

const obj = {
    sender,
    nonce: '0x1',
    initCode: '0x373ace975747ee10c63afec210e686d05a2f825ecafb07241a84abb0b8655a00',
    callData,
    callGasLimit: '0x5318',
    verificationGasLimit: '0x13ab5',
    preVerificationGas: '0xd373',
    maxFeePerGas: '0x16',
    maxPriorityFeePerGas: '0x2',
    paymasterAndData: '0x',
    signature: signedUserOpHash
}

const req = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_sendUserOperation",
    "params": [
        // UserOperation object
        obj,

        // Supported EntryPoint address
        "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    ]
}

const main = async () => {

    const { data } = await axios.post(process.env.RPC_URL as string, req)
    console.log(data)
}

main()
