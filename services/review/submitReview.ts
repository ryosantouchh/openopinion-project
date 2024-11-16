import { isEmpty } from "lodash";

import ReviewABI from "../../abi/ReviewABI.json";
import ReviewABINew from "../../abi/ReviewABINew.json";

import { PinataSDK } from "pinata-web3";
import { uploadToPinata } from "../pinata";
import { MiniKit } from "@worldcoin/minikit-js";
import { apiWrapper, verifyWorldId } from "@/utils";
import { VerifySubmitReviewPayload } from "@/constants";
import axios from "axios";

import { randomBytes } from "crypto"; // Assuming Node.js environment

export async function submitReview({
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
    const newReview = {
      ...(!isEmpty(newOverviewReview) && newOverviewReview),
      ...(!isEmpty(newInterviewReview) && newInterviewReview),
      ...(!isEmpty(newSalaryReview) && newSalaryReview),
      ...(!isEmpty(newBenefitReview) && newBenefitReview),
    };

    // const generateNonce = () => {
    //   return new Promise((resolve, reject) => {
    //     randomBytes(32, (err, buffer) => {
    //       if (err) {
    //         reject(err);
    //         return;
    //       }
    //
    //       const nonce = Buffer.from(buffer).toString("base64");
    //       resolve(nonce);
    //     });
    //   });
    // };

    const pinataHash = await uploadToPinata(newReview);

    const { commandPayload, finalPayload } =
      await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: "0x6b1D03eaFF92cADFD89853c6340CF753C33315aC",
            // address: process.env.NEXT_PUBLIC_REVIEW_CONTRACT_ADDRESS!,
            abi: ReviewABINew,
            functionName: "submitReview",
            args: [companyName, ratingArray, pinataHash],
          },
        ],
      });

    console.log(finalPayload);

    return;
  } catch (error) {
    console.log(error);
  }
}
