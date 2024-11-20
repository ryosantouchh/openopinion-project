import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/dist/client/components/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <Button
            className="mb-4"
            size="md"
            variant="light"
            onClick={() => router.back()}
        >
            <Icon icon="mdi:arrow-left" className="mr-2" /> Back
        </Button>
    );
}