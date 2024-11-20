"use client";

import { Web3 } from "web3";

import ReviewABI from "../../abi/ReviewABI.json";
import ReviewABINew from "../../abi/ReviewABINew.json";
import testABI from "../../abi/testABI.json";

import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { VerifySubmitReviewPayload } from "@/constants";
import { useSubmitReview } from "@/hooks";
// import { submitReview } from "@/services";
import { uploadToPinata } from "@/services/pinata/uploadToPinata";
import { Button } from "@nextui-org/react";
import {
  ISuccessResult,
  MiniAppSendTransactionPayload,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
} from "@worldcoin/minikit-js";
import { verifyWorldId } from "@/utils";
import { isEmpty } from "lodash";

import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { createPublicClient, http, PublicClient } from "viem";
import { worldchainSepolia as worldchainSepoliaData } from "viem/chains";
import { useEffect, useState } from "react";

export default function TestComponent() {
  const [transactionId, setTransactionId] = useState<string>("");

  const testObject = {
    title: "title",
    content: "contentttttttttttttttttt",
  };

  async function submitReview({
    companyName,

    newOverviewReview,
    newInterviewReview,
    newSalaryReview,
    newBenefitReview,
  }: {
    companyName: string;

    newOverviewReview?: Record<string, unknown>;
    newInterviewReview?: Record<string, unknown>;
    newSalaryReview?: Record<string, unknown>;
    newBenefitReview?: Record<string, unknown>;
  }): Promise<void> {
    try {
      const isVerified = await verifyWorldId(VerifySubmitReviewPayload);

      // NOTE : sequence of value inside this array should be placed like below
      // TODO : check type in any new object below
      const ratingArray = [
        isEmpty(newOverviewReview) ? 0 : newOverviewReview.rating,
        isEmpty(newInterviewReview) ? 0 : newInterviewReview.rating,
        isEmpty(newSalaryReview) ? 0 : newSalaryReview.rating,
        isEmpty(newBenefitReview) ? 0 : newBenefitReview.rating,
      ];

      // const ratingArray = [
      //   1000000000000000000, 2000000000000000000, 3000000000000000000,
      //   4000000000000000000,
      // ];

      const newReview = {
        ...(!isEmpty(newOverviewReview) && newOverviewReview),
        ...(!isEmpty(newInterviewReview) && newInterviewReview),
        ...(!isEmpty(newSalaryReview) && newSalaryReview),
        ...(!isEmpty(newBenefitReview) && newBenefitReview),
      };

      const pinataHash = await uploadToPinata(newReview);

      const deadline = Math.floor(
        (Date.now() + 30 * 60 * 1000) / 1000,
      ).toString();

      const permitTransfer = {
        permitted: {
          token: worldchainSepoliaData.nativeCurrency.name,
          amount: "0",
        },
        nonce: Date.now().toString(),
        deadline,
      };

      const a = MiniKit.commands.sendTransaction({
        transaction: [
          {
            address: "0x6b1D03eaFF92cADFD89853c6340CF753C33315aC",
            abi: ReviewABINew,
            functionName: "submitReview",
            args: [companyName, ratingArray, pinataHash],
          },
        ],
        // permit2: [
        //   {
        //     ...permitTransfer,
        //     spender: "0x6b1D03eaFF92cADFD89853c6340CF753C33315aC",
        //   },
        // ],
      });

      console.log(a);

      return;
    } catch (error) {
      console.log(error);
    }
  }

  const client = createPublicClient({
    chain: worldchainSepoliaData,
    transport: http("https://worldchain-sepolia.g.alchemy.com/public"),
  }) as PublicClient;

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      client,
      appConfig: {
        app_id: process.env.NEXT_PUBLIC_APP_ID!,
      },
      transactionId,
    });

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppSendTransaction,
      async (payload: MiniAppSendTransactionPayload) => {
        if (payload.status === "error") {
          console.error("Error sending transaction", payload);
        } else {
          setTransactionId(payload.transaction_id);
        }
      },
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppSendTransaction);
    };
  }, []);

  return (
    <>
      <Button
        onClick={async () =>
          await submitReview({
            companyName: "companyName",
            newOverviewReview: testObject,
          })
        }
      >
        Test
      </Button>

      <Button
        onClick={async () =>
          await submitReview({
            companyName: "companyName",
            newOverviewReview: testObject,
          })
        }
      >
        Test
      </Button>

      {/* <IDKitWidget */}
      {/*   app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // obtained from the Developer Portal */}
      {/*   action="vote_1" // this is your action id from the Developer Portal */}
      {/*   onSuccess={testSuccess} // callback when the modal is closed */}
      {/*   // handleVerify={handleVerify} // optional callback when the proof is received */}
      {/*   verification_level={VerificationLevel.Device} */}
      {/* > */}
      {/*   {({ open }) => <button onClick={open}>Verify with World ID</button>} */}
      {/* </IDKitWidget> */}
    </>
  );
}
