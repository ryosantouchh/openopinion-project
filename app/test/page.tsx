"use client";

// import { Web3 } from "web3";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { VerifySubmitReviewPayload } from "@/constants";
import { useSubmitReview } from "@/hooks";
import { submitReview } from "@/services";
import { uploadToPinata } from "@/services/pinata/uploadToPinata";
import { Button } from "@nextui-org/react";
import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";

import { useAccount } from "wagmi";

export default function TestComponent() {
  const testObject = {
    title: "title",
    content: "contentttttttttttttttttt",
  };

  // const a = useAccount();
  // console.log(a.address);

  // const testSuccess = () => {
  //   console.log("successssss");
  // };

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
