import {
  MiniKit,
  VerifyCommandInput,
  // VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionSuccessPayload,
} from "@worldcoin/minikit-js";

export const verifyWorldId = async (
  verifyPayload: VerifyCommandInput,
): Promise<boolean | void> => {
  if (!MiniKit.isInstalled()) {
    return;
  }
  // World App will open a drawer prompting the user to confirm the operation, promise is resolved once user confirms or cancels
  const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

  if (finalPayload.status === "error") {
    console.log("Error payload", finalPayload);

    return false;
  }

  // return finalPayload;

  // Verify the proof in the backend
  const verifyResponse = await fetch("/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
      action: verifyPayload.action,
      ...(verifyPayload.signal ? { signal: verifyPayload.signal } : undefined),
    }),
  });

  console.log(finalPayload);

  // TODO: Handle Success!
  const verifyResponseJson = await verifyResponse.json();
  if (verifyResponseJson.status === 200) {
    console.log("Verification success!");

    return true;
  }
};
