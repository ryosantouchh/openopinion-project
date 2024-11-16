"use client";

import React from "react";
import { Button, Tooltip, ScrollShadow } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

import PromptInput from "./promptInput";

export default function Component() {
    const onClickIdea = (idea: string) => {
        setPrompt(idea);
    }
    const ideas = [
        "Create a blog post about NextUI explain it in simple terms",
        "Give me 10 ideas for my next blog post include only the best ideas"
    ];

    const [prompt, setPrompt] = React.useState<string>("");

    return (
        <></>
    );
}
