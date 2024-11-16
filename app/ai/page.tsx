"use client";

import React from "react";
import { Button, Tooltip, ScrollShadow } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Avatar } from "@nextui-org/react";
import PromptInput from "@/app/components/promptInput";
import { cn } from "@nextui-org/react";

export default function AiChatComponent() {
    const [prompt, setPrompt] = React.useState<string>("");

    const onClickIdea = (idea: string) => {
        setPrompt(idea);
    };

    const ideas = [
        "Create a blog post about NextUI explaining it in simple terms",
        "Give me 10 ideas for my next blog post, only the best ones!"
    ];

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-6 gap-8 bg-gray-50 rounded-xl shadow-md">
            {/* AI Header */}
            <div className="flex flex-col items-center justify-center text-center gap-4">
                <Avatar
                    src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
                    className="border-2 border-primary shadow-sm"
                />
                <h1 className="text-2xl font-bold text-gray-800">How can I help you today?</h1>
                <p className="text-sm text-gray-600">
                    Ask me anything or pick an idea below to get started!
                </p>
            </div>

            {/* Suggested Ideas */}
            <ScrollShadow
                hideScrollBar
                className="flex gap-4 py-2 overflow-x-auto"
                orientation="horizontal"
            >
                {ideas.map((idea, index) => (
                    <Button
                        key={index}
                        variant="flat"
                        size="lg"
                        color="primary"
                        className="min-w-max text-sm font-medium text-left bg-white shadow-sm rounded-md hover:bg-primary/10 transition-colors"
                        onClick={() => onClickIdea(idea)}
                    >
                        {idea}
                    </Button>
                ))}
            </ScrollShadow>

            {/* Chat Input */}
            <div className="flex w-full flex-col gap-4">
                <form
                    className="flex w-full flex-col items-start p-4 bg-white rounded-lg shadow-sm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Prompt submitted:", prompt);
                    }}
                >
                    <PromptInput
                        placeholder="Type your question or idea here..."
                        classNames={{
                            inputWrapper: "!bg-gray-100",
                            innerWrapper: "relative",
                            input: "py-3 px-4 text-lg",
                        }}
                        minRows={3}
                        radius="lg"
                        value={prompt}
                        onValueChange={setPrompt}
                        endContent={
                            <div className="absolute bottom-2 right-2 flex items-center">
                                <Tooltip showArrow content="Send message">
                                    <Button
                                        isIconOnly
                                        color={!prompt ? "default" : "primary"}
                                        isDisabled={!prompt}
                                        radius="full"
                                        size="sm"
                                        variant="solid"
                                    >
                                        <Icon
                                            className={cn(
                                                "[&>path]:stroke-[2px]",
                                                !prompt ? "text-gray-400" : "text-primary-foreground",
                                            )}
                                            icon="solar:arrow-up-linear"
                                            width={20}
                                        />
                                    </Button>
                                </Tooltip>
                            </div>
                        }
                    />
                </form>
            </div>
        </div>
    );
}
