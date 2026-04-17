import requests
import json
import time

# Read the system prompt from the project
system_prompt = """You are an AI assistant that generates news card content.
Generate a JSON response with the following structure:
{
  "mainTitle": "主标题",
  "cards": [
    {"title": "标题1", "desc": "描述1", "icon": "icon1"},
    {"title": "标题2", "desc": "描述2", "icon": "icon2"},
    {"title": "标题3", "desc": "描述3", "icon": "icon3"}
  ]
}
Generate 3-5 cards based on the input topic."""

url = "http://localhost:11434/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ollama"
}
data = {
    "model": "qwen3.5:0.8b",
    "messages": [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "人工智能在医疗领域的应用"}
    ],
    "temperature": 0.7,
    "top_p": 1
}

try:
    print("Testing Ollama with full system prompt...")
    start = time.time()
    response = requests.post(url, headers=headers, json=data, timeout=300)
    elapsed = time.time() - start
    print(f"Response received in {elapsed:.2f} seconds")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text[:2000]}")
except Exception as e:
    print(f"Error: {e}")
