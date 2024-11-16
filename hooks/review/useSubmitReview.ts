import { VerifySubmitReviewPayload } from "@/constants";
import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";

export function useSubmitReview() {
  // useEffect(() => {
  //   if (!MiniKit.isInstalled()) {
  //     return;
  //   }
  //
  //   console.log("inside effect");
  //
  //   MiniKit.subscribe(
  //     ResponseEvent.MiniAppVerifyAction,
  //     async (response: MiniAppVerifyActionPayload) => {
  //       console.log("before error");
  //       if (response.status === "error") {
  //         return console.log("Error payload", response);
  //       }
  //
  //       console.log("event listened");
  //
  //       // Verify the proof in the backend
  //       const verifyResponse = await fetch("/api/verify", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           payload: response as ISuccessResult, // Parses only the fields we need to verify
  //           action: VerifySubmitReviewPayload.action,
  //         }),
  //       });
  //
  //       // TODO: Handle Success!
  //       const verifyResponseJson = await verifyResponse.json();
  //       if (verifyResponseJson.status === 200) {
  //         console.log("Verification success!");
  //       }
  //     },
  //   );
  //
  //   return () => {
  //     MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
  //   };
  // }, []);
}
