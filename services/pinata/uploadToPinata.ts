import type { PinResponse } from "pinata-web3";

import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

export async function uploadToPinata(jsonObject: Record<string, unknown>) {
  try {
    const pinataResponse: PinResponse = await pinata.upload.json(jsonObject);

    const { IpfsHash } = pinataResponse;

    return IpfsHash;
  } catch (error) {
    console.log(error);
  }
}
