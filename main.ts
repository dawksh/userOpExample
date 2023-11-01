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
}

main()