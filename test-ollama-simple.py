import requests
import json
import time

url = "http://localhost:11434/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ollama"
}

# Test with a very simple request
data = {
    "model": "qwen3.5:0.8b",
    "messages": [
        {"role": "user", "content": "Say hello"}
    ],
    "max_tokens": 10
}

try:
    print("Testing Ollama with simple request...")
    start = time.time()
    response = requests.post(url, headers=headers, json=data, timeout=60)
    elapsed = time.time() - start
    print(f"Response received in {elapsed:.2f} seconds")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
