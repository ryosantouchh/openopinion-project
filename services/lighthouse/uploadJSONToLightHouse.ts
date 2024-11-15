import { apiWrapper } from "@/utils";
import lighthouse from "@lighthouse-web3/sdk";
import { MiniKit } from "@worldcoin/minikit-js";

export async function uploadJSONToLightHouse<TUploadData>({
  dataObject,
  name,
}: {
  dataObject: TUploadData;
  name: string;
}) {
  try {
    const jsonb = JSON.stringify(dataObject);

    const { data: responseData } = await lighthouse.uploadText(
      jsonb,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!,
      name,
    );

    // TODO : store hash (cid) on chain
    // TODO : store hash (cid) on chain
    const { Hash } = responseData;

    // TODO : interact with smart contract through ABI here
    // TODO : interact with smart contract through ABI here

    // const { commandPayload, finalPayload } =
    //   await MiniKit.commandsAsync.sendTransaction({
    //     transaction: [
    //       {
    //  // TODO: Hash sending here
    //         address: "0x34afd47fbdcc37344d1eb6a2ed53b253d4392a2f",
    //         abi: DEXABI,
    //         functionName: "signatureTransfer",
    //         args: [transferDetailsArgsForm],
    //       },
    //     ],
    //   });
    //
    // return
  } catch (error) {
    throw error;
  }
}
