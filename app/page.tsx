import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import { Button } from "@nextui-org/button";
// import { usePrivy } from "@privy-io/react-auth";
import CompanyCard from "./components/companyCard";
import TestComponent from "./test/page";

export default function Home() {
  // const { getAccessToken } = usePrivy();
  // const accessToken = getAccessToken();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <SignIn />
      <VerifyBlock />
      <PayBlock />

      <TestComponent />
    </main>
  );
}
