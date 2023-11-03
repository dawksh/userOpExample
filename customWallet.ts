
import { ethers } from 'ethers';
import { config } from 'dotenv';
import axios from "axios";
import factoryABI from './factoryabi'
config();

const sender = "0x6845c2f3f3b94b3be1bfd77fbee9ce481e78e005";
const nonce = "0x0"
const callGasLimit = "0xc350";
const verificationGasLimit = "0x33450";
const preVerificationGas = "0xc350";
const maxFeePerGas = "0x2b";
const maxPriorityFeePerGas = "0x9";
const paymasterAndData = "0x";
const factory = new ethers.utils.Interface(factoryABI);

const factoryData = factory.encodeFunctionData("createAccount", [[ethers.utils.getAddress("0x28172273CC1E0395F3473EC6eD062B6fdFb15940")], "0x45"])

const initCode = "0x"

const accountABI = ["function execute(address to, uint256 value, bytes data)"];

const account = new ethers.utils.Interface(accountABI);

const callData = account.encodeFunctionData("execute", [ethers.utils.getAddress("0x28172273CC1E0395F3473EC6eD062B6fdFb15940"), ethers.utils.parseEther("0"), "0x"])


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
        ethers.utils.keccak256(initCode),
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
    [ethers.utils.keccak256(packedData), "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", "0xaa36a7"]
);

console.log(enc)


const signedUserOpHash = "0x3895e1ef23344c74e09644c2be2e0514c7fcbd931441375ea05913eeda2cf3b343b56992b81a7c30538cbbddff1da717469034d900c90248903a1800ac4dd79d1b";


const obj = {
    sender,
    nonce,
    initCode: initCode,
    callData,
    callGasLimit,
    verificationGasLimit,
    preVerificationGas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    paymasterAndData,
    signature: signedUserOpHash
}

console.log(obj)

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
