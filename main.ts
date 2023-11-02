// Welcome to the ERC-4337 tutorial #1!
// This tutorial walks you though a simple ERC-4337 transaction: sending a User Operation
// with gas paid by a Paymaster.
//
// You can view more information about this tutorial at
// https://docs.stackup.sh/docs/get-started-with-stackup
//
// Enter `npx ts-node main.ts` into your terminal to run.

import { ethers } from "ethers";
import { Presets, Client } from "userop";
import { config } from "dotenv";

config();

const TO = "0x4006c21A130D70000f59e009E4f81DB18eb1Ef00";
const VALUE = 0.5;

const main = async () => {

    const paymasterRpcUrl = process.env.PAYMASTER_URL as string;
    const paymasterContext = { type: "payg" }

    const paymaster = Presets.Middleware.verifyingPaymaster(
        paymasterRpcUrl,
        paymasterContext
    )

    const signer = new ethers.Wallet(process.env.SIGNING_KEY as string);
    const rpcUrl = process.env.RPC_URL as string;

    const builder = await Presets.Builder.Kernel.init(signer, rpcUrl, { paymasterMiddleware: paymaster });

    const address = builder.getSender();

    console.log(address);

    const send = {
        to: TO,
        value: ethers.utils.parseEther("0"),
        data: "0x",
    }

    const calls = [send]

    const client = await Client.init(rpcUrl);
    const res = await client.sendUserOperation(builder.executeBatch(calls), {
        onBuild: (op) => { console.log(op) },
    });

    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait()
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);


}


main()