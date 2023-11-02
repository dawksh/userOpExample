
import { ethers } from 'ethers';
import { config } from 'dotenv';
import axios from "axios";
config();

const sender = "0x6845c2f3f3b94b3be1bfd77fbee9ce481e78e005";
const nonce = "0x0"
const callGasLimit = "0x53118";
const verificationGasLimit = "0x113ab5";
const preVerificationGas = "0xd2373";
const maxFeePerGas = "0x29";
const maxPriorityFeePerGas = "0x5";
const paymasterAndData = "0x";
const factoryABI = ["function createAccount(address[] memory owners, uint256 salt)"];
const factory = new ethers.utils.Interface(factoryABI);

const factoryData = factory.encodeFunctionData("createAccount", [[ethers.utils.getAddress("0x28172273CC1E0395F3473EC6eD062B6fdFb15940")], 69])

const initCode = ethers.utils.hexConcat(["0x3e3d512806A0338dA86AD3c80243f0A480b71323", factoryData])

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
    [ethers.utils.keccak256(packedData), "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", "5"]
);

console.log(enc)


const signedUserOpHash = "0x4f3e1b8db87949713acf594e595ffead401d035c45f7afb5958fc23444cca5d246b9e88993a2f079122d035599bb9995022f75a3ffcf1860483af2648e54afe01b";


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
