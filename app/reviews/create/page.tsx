"use client";

import React, { useState } from "react";

import ReviewABINew from "@/abi/ReviewABINew.json";

import { Button, Input } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useReviewStore } from "@/hooks/review/useReviewStore";
import { uploadToPinata } from "@/services";
import { MiniKit } from "@worldcoin/minikit-js";
import { isEmpty } from "lodash";
import { verifyWorldId } from "@/utils";
import { VerifySubmitReviewPayload } from "@/constants";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { createPublicClient, http, PublicClient } from "viem";
import { worldchainSepolia } from "viem/chains";

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
      // 4, 1, 3, 4,
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

    const pinataHash = await uploadToPinata(newReview);

    const finalPayload = MiniKit.commands.sendTransaction({
      transaction: [
        {
          address: "0x6b1D03eaFF92cADFD89853c6340CF753C33315aC",
          abi: ReviewABINew,
          functionName: "submitReview",
          args: [companyName, ratingArray, pinataHash],
        },
      ],
    });

    return;
  } catch (error) {
    console.log(error);
  }
}

export default function CreateReviewPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const { jobPosition, setJobPosition, employeeName, setEmployeeName } =
    useReviewStore();
  const [isError, setIsError] = useState<boolean>(false);

  const [transactionId, setTransactionId] = useState<string>("");

  const client = createPublicClient({
    chain: worldchainSepolia,
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

  const handleSelect = (value: string) => {
    setSelected(value);
    if (isError) setIsError(false);
  };

  const handleJobPositionChange = (value: string) => {
    setJobPosition(value);
    if (isError && value.trim()) setIsError(false);
  };

  const handleNext = () => {
    if (!selected || !jobPosition.trim() || !employeeName.trim()) {
      setIsError(true);
      return;
    }
    router.push(`/reviews/${selected}/create`);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8 bg-white">
      <h1 className="text-3xl font-extrabold text-center text-primary">
        What's on your mind to review?
      </h1>
      <div>
        <Input
          required
          isClearable
          label="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          onClear={() => setEmployeeName("")}
          className="text-lg text-gray-700 font-medium mb-4"
        />
        <Input
          required
          isClearable
          label="Job Position"
          value={jobPosition}
          onChange={(e) => handleJobPositionChange(e.target.value)}
          onClear={() => handleJobPositionChange("")}
          className="text-lg text-gray-700 font-medium mb-4"
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {["overview", "interview", "salary", "benefits"].map((item) => (
          <Button
            key={item}
            value={item}
            onClick={() => handleSelect(item)}
            className={cn(
              "h-24 text-lg rounded-lg transition-all",
              selected === item
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300",
            )}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </div>

      {isError && (
        <p className="text-red-500 text-sm">* Please fill in all fields.</p>
      )}
      <div className="flex justify-end gap-4">
        <Button
          variant="light"
          onClick={() => {
            setSelected(null);
            setJobPosition("");
            setEmployeeName("");
            setIsError(false);
            router.back();
          }}
          className="text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleNext} disabled={isError}>
          Next
        </Button>
      </div>
    </div>
  );
}
