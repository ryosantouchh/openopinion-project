import { VerificationLevel, VerifyCommandInput } from "@worldcoin/minikit-js";

export const VerifySubmitReviewPayload: VerifyCommandInput = {
  action: "oo-submit-review", // This is your action ID from the Developer Portal
  verification_level: VerificationLevel.Device,
};
