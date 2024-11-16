"use client";

import { uploadToPinata } from "@/services/pinata/uploadToPinata";
import { Button } from "@nextui-org/react";

export default function TestComponent() {
  const testObject = {
    name: "Nokkok Boi",
    team: "BKM",
  };

  return (
    <Button onClick={async () => await uploadToPinata(testObject)}>Test</Button>
  );
}
