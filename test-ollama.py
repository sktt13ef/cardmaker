import requests
import json

url = "http://localhost:11434/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ollama"
}
data = {
    "model": "qwen3.5:0.8b",
    "messages": [
        {"role": "user", "content": "Hello"}
    ],
    "max_tokens": 50
}

try:
    print("Testing Ollama API...")
    response = requests.post(url, headers=headers, json=data, timeout=30)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
