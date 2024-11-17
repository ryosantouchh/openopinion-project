import os
import json
from function_handling import (
    handle_salary,
    get_data_from_topic,
)

from groq import Groq
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class UserInput(BaseModel):
    user_prompt: str

@app.post("/query")
async def user_input(user_input: UserInput):
    try:
        return function_calling(user_input.user_prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


load_dotenv()
print("Groq API key configuration: " + os.environ["GROQ_API_KEY"][:10] + "...")


def function_calling(user_prompt: str):
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    model = "llama3-groq-70b-8192-tool-use-preview"

    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant specializing in career-related questions. \
                    If user have any questions about companies overviews, salaries for each position, \
                    interview experience for each postion or about benefits that you'll get inside that company.\
                    you are the right person to ask.",
        },
        {
            "role": "user",
            "content": f"please find me the right answer for this following question: {user_prompt}",
        },
    ]

    tools = [
        {
            "type": "function",
            "function": {
                "name": "handle_topic",
                "description": "handle the topic that user interested in.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "topic": {
                            "type": "string",
                            "description": "the topic that user interested in.",
                        },
                        "company": {
                            "type": "string",
                            "description": "the company that user interested in.",
                        },
                        "position": {
                            "type": "string",
                            "description": "the job that user interested in.",
                        },
                        "required": ["topic", "company", "position"],
                    },
                },
            },
        }
    ]

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        tools=tools,
        tool_choice="auto",
        max_tokens=4096,
    )
    response = response.choices[0].message
    tool_calls = response.tool_calls
    messages.append(
        {
            "role": "assistant",
            "tool_calls": [
                {
                    "id": tool_call.id,
                    "function": {
                        "name": tool_call.function.name,
                        "arguments": tool_call.function.arguments,
                    },
                    "type": tool_call.type,
                }
                for tool_call in tool_calls
            ],
        }
    )

    available_functions = {
        "handle_topic": handle_topic,
    }

    for tool_call in tool_calls:
        function_name = tool_call.function.name
        function_to_call = available_functions[function_name]
        function_args = json.loads(tool_call.function.arguments)
        function_response = function_to_call(**function_args)

        messages.append(
            {
                "role": "tool",
                "content": json.dumps(function_response),
                "tool_call_id": tool_call.id,
            }
        )

    print(json.dumps(messages, indent=2))

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        tools=tools,
        tool_choice="auto",
        max_tokens=4096,
        temperature=0.0,
    )

    return response.choices[0].message.content


def handle_topic(topic: str, company: str, position: str):
    if topic == "overview":
        combine_txt, rating = get_data_from_topic(topic, company, position)
        return text_summary(combine_txt) + "\n\nAverage rating: " + str(rating)
    elif topic == "salary":
        return handle_salary(position=position, company=company)
    elif topic == "interview":
        combine_txt, difficulty = get_data_from_topic(topic, company, position)
        return text_summary(combine_txt) + "\n\nAverage difficulty: " + str(difficulty)
    else:
        return "I'm sorry, I can't help with that topic."


def text_summary(text: str):
    sum_model = "llama3-8b-8192"
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    prompt = f"summarize in 5 bullets: {text}"
    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant specializing in text summarization.",
        },
        {
            "role": "user",
            "content": prompt,
        },
    ]

    response = client.chat.completions.create(
        model=sum_model,
        messages=messages,
        max_tokens=4096,
    )

    return response.choices[0].message.content.strip()


