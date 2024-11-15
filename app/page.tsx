import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import { uploadDataToAkave } from "@/services/akave";
import { Button } from "@nextui-org/button";

export default function Home() {
  console.log("test");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <SignIn />
      <VerifyBlock />
      <PayBlock />
      <Button>Click me</Button>
    </main>
  );
}
