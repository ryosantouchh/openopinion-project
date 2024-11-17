from dotenv import load_dotenv
from pymongo import MongoClient
from rapidfuzz import fuzz

import os

load_dotenv()
connection_string = os.getenv("MONGO_URI")

if connection_string is None:
    raise ValueError("MONGO_URI not found in environment variables")

client = MongoClient(connection_string)

db = client["bkm-db"]

overview_collection = db["overview"]
salary_collection = db["salary"]
benefits_collection = db["benefit"]
interviews_collection = db["interview"]


def get_data_from_topic(topic: str, company: str, position: str):
    if topic == "overview":
        return handle_overviews(company, position)
    elif topic == "interview":
        return handle_interviews(company, position)


def handle_overviews(company: str, position: str):
    documents = overview_collection.find(
        {},
        {
            "_id": 0,
            "company": 1,
            "review.position": 1,
            "review.content": 1,
            "review.rating": 1,
        },
    )
    threshold = 80
    combined_txt = ""
    avg_rating = 0
    count = 0
    # if the position is all matching only company's
    if position == 'all':
        for document in documents:
            company_score = fuzz.partial_ratio(document["company"].lower(), company.lower())
            if company_score >= threshold:
                combined_txt += document["review"]["content"] + "\n"
                avg_rating += float(document["review"]["rating"])
                count += 1

    else:
        for document in documents:
          position_score = fuzz.partial_ratio(document["review"]["position"].lower(), position.lower())
          company_score = fuzz.partial_ratio(document["company"].lower(), company.lower())
          if position_score >= threshold and company_score >= threshold:
              combined_txt += document["review"]["content"] + "\n"
              avg_rating += float(document["review"]["rating"])
              count += 1

    if len(combined_txt) > 0:
        avg_rating = avg_rating / count
        return combined_txt, avg_rating
    
    return f"Could not find any overview information for {position} at {company}."


def handle_salary(company: str, position: str) -> str:
    avg_salary = 0
    threshold = 80
    documents = salary_collection.find(
        {}, {"_id": 0, "company": 1, "review.salary": 1, "review.position": 1}
    )

    results = []
    for document in documents:
        position_score = fuzz.partial_ratio(
            document["review"]["position"].lower(), position.lower()
        )
        company_score = fuzz.partial_ratio(document["company"].lower(), company.lower())

        if position_score >= threshold and company_score >= threshold:
            # parse salary from string to integer
            salary = int(document["review"]["salary"].replace("$", "").replace(",", ""))
            results.append(salary)

    if len(results) > 0:
        avg_salary = sum(results) / len(results)
    else:
        return f"Could not find any salary information for {position} at {company}."

    return f"The average salary of {position}  at {company} is {avg_salary} usd."


def handle_interviews(company: str, position: str):
    documents = interviews_collection.find(
        {},
        {
            "_id": 0,
            "company": 1,
            "review.difficulty": 1,
            "review.position": 1,
            "review.content": 1,
        },
    )
    threshold = 80
    combined_txt = ""
    difficulty = ""
    for document in documents:
        position_score = fuzz.partial_ratio(
            document["review"]["position"].lower(), position.lower()
        )
        company_score = fuzz.partial_ratio(document["company"].lower(), company.lower())

        if position_score >= threshold and company_score >= threshold:
            combined_txt += document["review"]["content"] + "\n"
            difficulty += document["review"]["difficulty"] + " "

    if len(combined_txt) > 0:
        return combined_txt, difficulty

    return f"Could not find any interview information for {position} at {company}."
