"use client";

import React from "react";
import { Button, Tooltip, ScrollShadow, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Avatar } from "@nextui-org/react";
import PromptInput from "@/app/components/promptInput";
import { cn } from "@nextui-org/react";
import { buildUrl } from "@/utils/api";

export default function AiChatComponent() {
    const [prompt, setPrompt] = React.useState<string>("");
    const [response, setResponse] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [sentMessage, setSentMessage] = React.useState<string>("");

    const onClickIdea = (idea: string) => {
        setPrompt(idea);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload on form submit
        console.log("Prompt submitted:", prompt);

        setPrompt("");
        setResponse("...");
        setSentMessage(prompt);
        setLoading(true); // Set loading to true when the request starts

        try {
            const response = await fetch("http://localhost:8000/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_prompt: prompt })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResponse("An error occurred while fetching the response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const ideas = [
        "Give me the average salary working as a Designer at adobe",
        "Tell me about S/W engineer interview at meta.com",
    ];

    return (
        <div className="flex flex-col h-screen w-full max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-100 to-gray-50 rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-3 pb-6 border-b border-gray-200">
                <Avatar
                    size="lg"
                    src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
                    className="shadow-md"
                />
                <h1 className="text-2xl font-semibold text-gray-800">
                    How can I help you today?
                </h1>
                <p className="text-sm text-gray-600">Ask anything, I'm here to assist!</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-sm mt-4 ">
                {sentMessage && (
                    <div className="justify-self-end self-end bg-blue-500 text-white px-4 py-3 rounded-lg max-w-fit shadow-md break-words">
                        {sentMessage}
                    </div>
                )}
                {loading ? (
                    <div className="justify-self-start flex items-center gap-2 text-gray-600">
                        <Spinner size="sm" />
                        <p>Thinking...</p>
                    </div>
                ) : (
                    response && (
                        <div className="justify-self-start bg-gray-200 text-gray-800 px-4 py-3 rounded-lg max-w-fit shadow-md break-words">
                            {response}
                        </div>
                    )
                )}
            </div>


            {/* Suggestions */}
            <div className="flex gap-2 mt-4">
                <ScrollShadow
                    hideScrollBar
                    className="flex gap-2"
                    orientation="horizontal"
                >
                    {ideas.map((idea, index) => (
                        <Button
                            key={index}
                            variant="light"
                            size="sm"
                            className="bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm"
                            onClick={() => onClickIdea(idea)}
                        >
                            {idea}
                        </Button>
                    ))}
                </ScrollShadow>
            </div>

            {/* Chat Input */}
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-sm mt-4 sticky bottom-0"
            >
                <PromptInput
                    placeholder="Type your message..."
                    classNames={{
                        inputWrapper: "bg-white flex-grow shadow-inner rounded-lg",
                        input: "py-3 px-4 text-lg text-gray-800 placeholder-gray-400",
                    }}
                    minRows={1}
                    radius="lg"
                    value={prompt}
                    onValueChange={setPrompt}
                />
                <Tooltip showArrow content="Send message">
                    <Button
                        isIconOnly
                        color={!prompt ? "default" : "primary"}
                        isDisabled={!prompt || loading}
                        radius="full"
                        size="sm"
                        variant="solid"
                        className="shadow-md"
                        onClick={handleSubmit}
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
            </form>
        </div>
    );
}
